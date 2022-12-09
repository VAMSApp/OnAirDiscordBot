
import { GuildMemberRoleManager, Interaction, InteractionReplyOptions, SlashCommandBuilder, TextBasedChannel, TextBasedChannelFields, } from 'discord.js'
import { AirportResponse } from 'onair-api';
import { AccountRepo, AircraftRepo, AirportRepo, FerryRepo } from '../repos';
import { IBot } from '../interfaces';
import { Aircraft, Airport, Ferry } from '../types';

export default {
	data: new SlashCommandBuilder()
    .setName('ferry')
	.setDescription('Allows you t request a ferry')
    .addStringOption((option:any) =>
        option.setName('identifier')
            .setDescription('Aircraft that you want ferried')
            .setRequired(true)            
    )
    .addStringOption((option:any) =>
        option.setName('departure')
            .setDescription('Departure airport')
            .setRequired(true)
    )
    .addStringOption((option:any) =>
        option.setName('arrival')
            .setDescription('Arrival airport')
            .setRequired(true)
    )
    .addBooleanOption(option =>
        option.setName('ephemeral')
            .setDescription('Whether to show the results in an ephemeral message')
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
        const departure:string = interaction.options.getString('departure') as string;
        const arrival:string = interaction.options.getString('arrival') as string;
        const comment:string = interaction.options.getString('comment') as string;

        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');

        if (ephemeral === null) {
            ephemeral = true
        }

        await interaction.deferReply({ ephemeral: ephemeral });

        const account = await AccountRepo.findByDiscordId(interaction.member.user.id, { serialize: true });

        if (!account) {
            let noAccountFoundMsg = `Oops! It looks like You haven't linked your OnAir Company yet.\n`
            noAccountFoundMsg += `Please link your OnAir Company account with your Discord account before requesting a Ferry.\n`
            noAccountFoundMsg += `You can do this by typing \`/link\` to link your OnAir Company with Your Discord account.\n`
            noAccountFoundMsg += `If you need help, please contact an admin.\n`

            const reply:InteractionReplyOptions = {
                content: noAccountFoundMsg,
                ephemeral: ephemeral,
            };
            return await interaction.editReply(reply);
        }

        const aircraft:Aircraft = await AircraftRepo.findByIdentifier(identifier, { serialize: true, include: {
            CurrentAirport: true,
        }});

        if (!aircraft) {
            let noAircraftFoundMessage = `Aircraft with identifier \`${identifier}\` was not found, please check the identifier and try again.`;
            noAircraftFoundMessage += `If you need help, please contact an admin.\n`

            const reply:InteractionReplyOptions = {
                content: noAircraftFoundMessage,
                ephemeral: ephemeral,
            };
            return await interaction.editReply(reply);
        }

        const departureAirport:Airport = await AirportRepo.findOrUpsertByCode(departure, { serialize: true }, app);
        const arrivalAirport:Airport = await AirportRepo.findOrUpsertByCode(arrival, { serialize: true }, app);

        if (!departureAirport) {
            let noDepartureAirportMsg = `Departure airport with code \`${departure}\` was not found even after trying to upsert it from OnAir.\n`
            noDepartureAirportMsg += `Please check the code and try again or contact an admin for further assistance.\n`

            const reply:InteractionReplyOptions = {
                content: noDepartureAirportMsg,
                ephemeral: ephemeral,
            };
            return await interaction.editReply(reply);
        }

        if (!arrivalAirport) {
            let noArrivalAirportMsg = `Arrival airport with code \`${arrival}\` was not found even after trying to upsert it from OnAir.\n`
            noArrivalAirportMsg += `Please check the code and try again or contact an admin for further assistance.\n`
            const reply:InteractionReplyOptions = {
                content: noArrivalAirportMsg,
                ephemeral: ephemeral,
            };
            return await interaction.editReply(reply);
        }

        // add a ferry request in the database
        const ferryRequest:Ferry = await FerryRepo.create({
            Aircraft: {
                connect: {
                    Id: aircraft.Id
                }
            },
            DepartureAirport: {
                connect: {
                    Id: departureAirport.Id
                }
            },
            ArrivalAirport: {
                connect: {
                    Id: arrivalAirport.Id
                }
            },
            Account: {
                connect: {
                    AccountId: account.Id,
                }
            },
            ReqComment: comment || null,
            UpdatedAt: new Date(),
        });

        if (!ferryRequest) {
            let noFerryRequestMsg = `There was an error creating the ferry request, please try again or contact an admin for further assistance.\n`
            const reply:InteractionReplyOptions = {
                content: noFerryRequestMsg,
                ephemeral: ephemeral,
            };
            return await interaction.editReply(reply);
        }

        let msg = 'Ferry request submitted\n'
        msg += `\`\`\`\n`
        msg += `Aircraft: ${aircraft.Identifier}\n`
        msg += `Departure: ${departureAirport.ICAO}\n`
        msg += `Arrival: ${arrivalAirport.ICAO}\n`
        msg += `Submitted: ${ferryRequest.CreatedAt}\n`
        msg += `Comment: ${comment || 'None'}\n`
        msg += `\`\`\`\n`
        
    
        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: ephemeral,
        };
        
        return await interaction.editReply(reply);
    }
}
