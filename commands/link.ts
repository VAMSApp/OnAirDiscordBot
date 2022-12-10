
import { APIUser, GuildMember, GuildMemberRoleManager, Interaction, InteractionReplyOptions, Role, SlashCommandBuilder, TextBasedChannel, TextBasedChannelFields, User, } from 'discord.js'
import { AccountRepo, CompanyRepo, VirtualAirlineRepo } from '../repos';
import { Account, Company, NewAccount, NewCompany, TranslatedCompany, VirtualAirline } from '../types';
import { IBot } from '../interfaces';
import { CompanyResponse } from 'onair-api';
import { CompanyTranslator } from '../translators';

export default {
	data: new SlashCommandBuilder()
    .setName('link')
	.setDescription('Links your Discord account to your OnAir VA account')
    .addStringOption((option:any) =>
        option.setName('companycode')
            .setDescription('Your company Airline ICAO code')
            .setRequired(true)
    )
    .addStringOption((option:any) =>
        option.setName('companyid')
            .setDescription('Your company ID, found in the bottom left of your OnAir Global Settings page')
            .setRequired(true)
    )
    .addStringOption((option:any) =>
        option.setName('apikey')
            .setDescription('Optionally provide Your company Api Key, found in the bottom left of your OnAir Global Settings page')
            .setRequired(false)
    ),
    async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.member === null) return await interaction.reply('You must be in a server to use this command');
        let memberRoles = (interaction.member.roles as GuildMemberRoleManager).cache;
        if (!memberRoles) return await interaction.reply('Error getting Your current Discord roles, please contact an admin for further assistance.');

        let roles = interaction.guild?.roles.cache;
        if (!roles) return await interaction.reply('Error getting roles, please contact an admin for further assistance.');
        
        // ensure the interacting user has the matching Id for the 'member' role in config.ts
        let isVAMember = memberRoles.some((value:Role, key:string) => key === app.getRoleId("member"));
        if (interaction.member !== null && !isVAMember) {
            await interaction.reply('You must be a VA member to use this command! Contact an admin to get the member role.');
            return;
        }

        let connectedRoleExists = memberRoles.some((value:Role, key:string) => key === app.getRoleId("connected"));
        if (interaction.member !== null && connectedRoleExists) {
            await interaction.reply('Your OnAir Company is already connected! Contact an admin if you need to change your company or for further assistance.');
            return;
        }

        const companyId:string = interaction.options.getString('companyid') as string;
        const apiKey:string|null = interaction.options.getString('apikey');

        await interaction.deferReply({ ephemeral: true })
        
        // ensure the account isn't already linked
        const discordUser:User = interaction.user;
        const {
            id,
            username,
            discriminator,
        } = discordUser;

        const virtualAirline:VirtualAirline = await VirtualAirlineRepo.findFirst();
        
        // ensure the account exists
        let account:Account = await AccountRepo.findByDiscordId(id);
        // if the account doesn't exist, create it
        if (!account) {
            const newAccount:NewAccount = {
                DiscordId: id,
                Username: username,
                Discriminator: discriminator,
                IsOnAirLinked: false,
                IsAdmin: false,
                IsEnabled: true,
                ApprovedAt: new Date(),
            }

            account = await AccountRepo.create(newAccount);
        }

        // otherwise if the account exists, and the account is already linked, return
        if (account !== null && account.IsOnAirLinked === true) {
            const reply:InteractionReplyOptions = {
                content: `Hmm, Your account is already linked!`,
                ephemeral: true
            };
            
            return await interaction.editReply(reply);
        }

        // Try to find the Company by its Id in the database
        let company:Company = await CompanyRepo.findById(companyId);

        // get all of the company latest details from OnAir
        const oaCompany:CompanyResponse = await app.OnAir.getCompanyDetail(companyId);

        // if the OnAir company does not exist, return
        if (!oaCompany) {
            const reply:InteractionReplyOptions = {
                content: `The OnAir Company not found, check your company ID and try again or contact an admin for further assistance.`,
                ephemeral: true
            };
            
            return await interaction.editReply(reply);
        }
        
        // translate the OnAir company to a TranslatedCompany)
        const translatedCompany:TranslatedCompany = new CompanyTranslator(app).translate(oaCompany);

        // if the company doesn't exist, then create it
        if (!company) {
            // then create the company
            const newCompany:NewCompany = {
                ...translatedCompany,
                OnAirSyncedAt: new Date(),
                ApiKey: apiKey || null,
                Owner: { 
                    connect: {
                        Id: account.Id
                    }
                },
                World: {
                    connect: {
                        Id: translatedCompany.WorldId
                    }
                },
                VirtualAirline: {
                    connect: {
                        Id: virtualAirline.Id,
                    },
                },
            }

            delete newCompany.WorldId;
            company = await CompanyRepo.create(newCompany)
        }

        // if the company is still null something else happened, return
        if (!company) {
            const reply:InteractionReplyOptions = {
                content: `Error saving the OnAir Company into the database. Please contact an admin for further assistance.`,
                ephemeral: true
            };
            
            return await interaction.editReply(reply);
        }

        // otherwise Update the Account, connecting the Company and VirtualAirline to the Account
        account = await AccountRepo.update(account.Id, {
            ...account,
            IsOnAirLinked: true,
            VirtualAirline: {
                connect: {
                    Id: virtualAirline.Id,
                },
            },
            Company: {
                connect: {
                    Id: company.Id
                }
            }
        }, {
            include: {
                Company: true,
            }
        });
        
        let member:GuildMember = interaction.member as GuildMember;
        member.roles.add(app.getRoleId("connected")).catch(console.error);
        let msg = `Your OnAir Company has been linked with Your discord Account.\n\n`;
        msg += `\`\`\`\n`;
        msg += `Company Code: ${company.AirlineCode}\n`;
        msg += `Company Name: ${company.Name}\n`;
        msg += `Level: ${company.Level}\n`;
        msg += `Reputation: ${(company.Reputation*100).toFixed(2) + ' %'}\n`;
        msg += `Checkride Level: ${company.CheckrideLevel}\n`;
        msg += `Last Connection: ${company.LastConnection?.toDateString()}\n`;
        msg += `\`\`\`\n`;

        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: true
        };
        
        await interaction.editReply(reply);
        
    }
}
