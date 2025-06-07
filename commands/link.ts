import { IBot } from "@/interfaces";
import IsAuthorizedToRunCommand from "@/lib/IsAuthorizedToRunCommand";
import { Company, OnAirCompany, SlashCommand } from "@/types";
import { DiscordUserWithCompany } from "@/types/DiscordUser";
import { Prisma } from "@prisma/client";
import { ActionRowBuilder, Interaction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ModalSubmitInteraction } from "discord.js";

var linked:string[] = [];

const LinkCompanyCommand:SlashCommand = {
    name: 'link',
    description: 'Link a discord user to an OnAir company.',
    roleName: 'member',
    help:  {
        name: 'link',
        description: 'Usage: `/link `\n\nExample: `/link`',
        params: [

        ]
    },
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link a discord user to an OnAir company.'),
    async execute(interaction:Interaction, app:IBot):Promise<void> {
        if (!interaction.isChatInputCommand()) return;

        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        // first check if the discord user exists
        let discordUser: DiscordUserWithCompany|null = await app.DB.DiscordUserRepo.findOneByDiscordId(interaction.user.id);

        // if the discord user exists and has a company id, then they have already linked their company. Abort the command.
        if (discordUser && discordUser.CompanyId) {
            await interaction.reply({ content: `You have already linked your company ${discordUser.Company?.Identifier || ''}` });
            return;
        }

        // Use Modals to ask the user for their company code, company Id, and OnAir API Key
        const modal = new ModalBuilder()
            .setCustomId('link-company-modal')
            .setTitle('Link Company');

        const companyCodeInput = new TextInputBuilder()
            .setCustomId('company-code-input')
            .setLabel('Company Code')
            .setStyle(TextInputStyle.Short);

        const companyIdInput = new TextInputBuilder()
            .setCustomId('company-id-input')
            .setLabel('Company Id')
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(companyCodeInput);
        const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(companyIdInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);

        try {
            const submitted = await interaction.awaitModalSubmit({
                time: 15000,
                filter: i => i.customId === 'link-company-modal'
            });

            if (submitted) {
                const companyCode = submitted.fields.getTextInputValue('company-code-input');
                const companyId = submitted.fields.getTextInputValue('company-id-input');

                // defer the reply
                await submitted.deferReply({ ephemeral: true });

                // next,query OnAir for the company by the provided companyId
                const oaCompany: OnAirCompany = await app.OnAir.getCompanyDetail(companyId);
                const newCompany = new Company(oaCompany);

                // if the OnAir company is not found, abort the command.
                if (!oaCompany) {
                    await submitted.editReply({ content: 'OnAir Company not found, please check your company ID and try again.' });
                    return;
                }

                // first, check if the company exists in the database already, if not create it.
                // finally, create the discord user.

                // check if the company exists in the database already
                let company: Company|null = await app.DB.CompanyRepo.findOneById(companyId);

                // if the company does not exist in the database, add it to the create createDiscordUserQuery
                if (!company) {
                    newCompany.OwnerId = interaction.user.id;

                    company = await app.DB.CompanyRepo.create({
                        data: {
                            Id: newCompany.Id,
                            Name: newCompany.Name,
                            Identifier: newCompany.Identifier,
                            LastConnection: newCompany.LastConnection,
                            LastReportDate: newCompany.LastReportDate,
                            Reputation: newCompany.Reputation,
                            CreationDate: newCompany.CreationDate || new Date(),
                            DifficultyLevel: newCompany.DifficultyLevel,
                            Paused: newCompany.Paused,
                            Level: newCompany.Level,
                            LevelXP: newCompany.LevelXP,
                            LastRefresh: new Date(),
                            CreatedAt: new Date(),
                            UpdatedAt: new Date(),
                            OwnerId: interaction.user.id,
                            Owner: {
                                connectOrCreate: {
                                    where: {
                                        DiscordId: interaction.user.id
                                    },
                                    create: {
                                        DiscordId: interaction.user.id,
                                        Username: interaction.user.username,
                                        Discriminator: interaction.user.discriminator
                                    }
                                }
                            }
                        }
                    });
                    // otherwise the company exists, so we need to update it with the new data
                } else {
                    company = await app.DB.CompanyRepo.update({
                        where: { Id: company.Id },
                        data: {
                            Name: newCompany.Name,
                            Identifier: newCompany.Identifier,
                            LastConnection: newCompany.LastConnection,
                            LastReportDate: newCompany.LastReportDate,
                            Reputation: newCompany.Reputation,
                            CreationDate: newCompany.CreationDate || new Date(),
                            DifficultyLevel: newCompany.DifficultyLevel,
                            Paused: newCompany.Paused,
                            Level: newCompany.Level,
                            LevelXP: newCompany.LevelXP,
                            LastRefresh: new Date(),
                            UpdatedAt: new Date(),
                            OwnerId: interaction.user.id,
                            Owner: {
                                connectOrCreate: {
                                    where: {
                                        DiscordId: interaction.user.id
                                    },
                                    create: {
                                        DiscordId: interaction.user.id,
                                        Username: interaction.user.username,
                                        Discriminator: interaction.user.discriminator
                                    }
                                }
                            }
                        }
                    });
                }
                
                await submitted.editReply({ content: `OnAir Company ${company.Identifier} linked successfully` });
                app.log.info(`Discord user ${interaction.user.username}#${interaction.user.discriminator} has successfully linked their OnAir company ${company.Identifier}.`);
            }
        } catch (error) {
            console.error('Modal submission error:', error);
        }
    }
}

export default LinkCompanyCommand;
