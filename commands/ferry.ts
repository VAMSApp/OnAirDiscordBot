
import { GuildMemberRoleManager, Interaction, InteractionReplyOptions, SlashCommandBuilder, TextBasedChannel, TextBasedChannelFields, } from 'discord.js'
import { Airport as OnAirAport } from 'onair-api';
import { AccountRepo, AircraftRepo, AirportRepo, FerryRepo } from '../repos';
import { IBot } from '../interfaces';
import { Account, Aircraft, Airport, Ferry, TranslatedAirport } from '../types';
import { AirportProcessor, } from '../processors';
import { AirportTranslator } from '../translators';

export default {
	data: new SlashCommandBuilder()
    .setName('ferry')
	.setDescription('Allows you to request the ferry of VA owned Aircraft')
    .addStringOption((option:any) =>
        option.setName('identifier')
            .setDescription('The VA Aircraft Identifier that you want to be ferried')
            .setRequired(true)            
    )
    .addStringOption((option:any) =>
        option.setName('arrival')
            .setDescription('The Arriving Airport ICAO that You wish the aircraft to be ferried to.')
            .setRequired(true)
    )
    .addStringOption((option:any) =>
        option.setName('departure')
            .setDescription('The Departing Airport ICAO that the aircraft is currently at, will be loaded from OnAir otherwise.')
            .setRequired(false)
    )
    .addStringOption((option:any) =>
        option.setName('comment')
            .setDescription('Comment to include with the ferry request')
            .setRequired(false)
    ),    
    async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.member === null) return await interaction.reply('You must be in a server to use this command');
        
        let roles = (interaction.member.roles as GuildMemberRoleManager).cache;
        let isVAMember = roles.some((value, key) => key === app.getRoleId("member"));
        
        if (interaction.member !== null && !isVAMember) {
            await interaction.reply('You must be a VA member to use this command!');
            return;
        }

        const identifier:string = interaction.options.getString('identifier') as string;
        const departureAirportICAO:string|null = interaction.options.getString('departure');
        const arrivalAirportICAO:string = interaction.options.getString('arrival') as string;
        const comment:string = interaction.options.getString('comment') as string;

        await interaction.deferReply({ ephemeral: true });

        // try to find the calling users account in the database
        const account:Account = await AccountRepo.findByDiscordId(interaction.member.user.id, {
            include: {
                Company: true,
                Employee: true,
            },
            serialize: true
        });

        // if the account doesn't exist, return an error message
        if (!account) {
            let noAccountFoundMsg = `Oops! It looks like You haven't linked your OnAir Company yet.\n`
            noAccountFoundMsg += `Please link your OnAir Company account with your Discord account before requesting a Ferry.\n`
            noAccountFoundMsg += `You can do this by typing \`/link\` and providing the companyCode and companyId to link your OnAir Company with Your Discord account.\n`
            noAccountFoundMsg += `If you need further assistance, please contact an admin.\n`

            const reply:InteractionReplyOptions = {
                content: noAccountFoundMsg,
                ephemeral: true,
            };
            return await interaction.editReply(reply);
        }

        // try to find the aircraft in the database
        const aircraft:Aircraft = await AircraftRepo.findByIdentifier(identifier, { serialize: true, include: {
            CurrentAirport: true,
        }});

        // if the aircraft doesn't exist, return an error message 
        if (!aircraft) {
            let noAircraftFoundMessage = `Aircraft with identifier \`${identifier}\` was not found, please check the identifier and try again.`;
            noAircraftFoundMessage += `If you need further assistance, please contact an admin.\n`

            const reply:InteractionReplyOptions = {
                content: noAircraftFoundMessage,
                ephemeral: true,
            };
            return await interaction.editReply(reply);
        }

        const departureAirportCode:string = departureAirportICAO || aircraft.CurrentAirport.ICAO;
        const departureAirportProcessor = new AirportProcessor(undefined, app);
        const arrivalAirportProcessor = new AirportProcessor(undefined, app);

        const departureAirport:Airport = await departureAirportProcessor.processICAO(departureAirportCode, {
            serialize: true,
            translate: true,
            refresh: true,
            create: true,
            update: true,            
        });
        const arrivalAirport:Airport = await arrivalAirportProcessor.processICAO(arrivalAirportICAO, {
            serialize: true,
            translate: true,
            refresh: true,
            create: true,
            update: true,            
        });

        if (!arrivalAirport) {
            let noArrivalAirportMsg = `Arrival airport with code \`${arrivalAirportICAO}\` was not found even after trying to upsert it from OnAir.\n`
            noArrivalAirportMsg += `Please check the code and try again or contact an admin for further assistance.\n`
            const reply:InteractionReplyOptions = {
                content: noArrivalAirportMsg,
                ephemeral: true,
            };
            return await interaction.editReply(reply);
        }

        // see if there is already a pending ferry request for this aircraft
        const pendingFerryRequest:Ferry = await FerryRepo.findPendingByAircraftId(aircraft.Id, {
            serialize: true
        });

        if (pendingFerryRequest) {
            let pendingFerryRequestMsg = `Hmm, There is already a pending ferry request for aircraft \`${identifier}\`.\n`;
            const pendingFerryRequestReply:InteractionReplyOptions = {
                content: pendingFerryRequestMsg,
                ephemeral: true,
            };
            return await interaction.editReply(pendingFerryRequestReply);

        }

        // add a ferry request in the database
        const ferryRequest:Ferry = await FerryRepo.create({
            Aircraft: {
                connect: {
                    Id: aircraft.Id
                }
            },
            DepartureAirport: (departureAirport) ? {
                connect: {
                    Id: departureAirport.Id
                },
            } : null,
            ArrivalAirport: {
                connect: {
                    Id: arrivalAirport.Id
                },
            },
            Account: {
                connect: {
                    Id: account.Id,
                }
            },
            ReqComment: comment || null,
            UpdatedAt: new Date(),
        }, {
            serialize: true,
            include: {
                Account: {
                    include: {
                        Company: true,
                    },
                },
            },
        });

        if (!ferryRequest) {
            let noFerryRequestMsg = `There was an error creating the ferry request, please try again or contact an admin for further assistance.\n`
            const reply:InteractionReplyOptions = {
                content: noFerryRequestMsg,
                ephemeral: true,
            };
            return await interaction.editReply(reply);
        }

        let msg = 'Ferry request submitted!\n'
        msg += `\`\`\`\n`
        if (ferryRequest.Account !== undefined) {
            msg += `Account: ${ferryRequest.Account.Username}\n`

            if (ferryRequest.Account.Company !== undefined) {
                msg += `Company: ${ferryRequest.Account.Company.AirlineCode}\n`
            }
        }

        msg += `Aircraft: ${aircraft.Identifier}\n`
        msg += (departureAirport) ? `Departure: ${departureAirport.ICAO}\n` : `Departure: ${aircraft.CurrentAirport.ICAO}\n`
        msg += `Arrival: ${arrivalAirport.ICAO}\n`
        msg += `Submitted: ${ferryRequest.CreatedAt}\n`
        msg += `Comment: ${comment || 'None'}\n`
        msg += `\`\`\`\n`
        
    
        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: true,
        };
        
        return await interaction.editReply(reply);
    }
}
