import { Interaction, InteractionReplyOptions, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction } from 'discord.js';
import { Fbo as OnAirFbo, } from 'onair-api';
import { IBot } from '../interfaces';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';
import { SlashCommand } from '../types';
import { FBOList } from '../messages';

const FBOCommand:SlashCommand = {
    name: 'fbos',
    description: 'Lists all FBOs owned by the VA',
    roleName: 'member',
    help:  {
        name: 'fbos',
        description: 'Usage: `/fbos`\n\nExample: `/fbos`',
        params: [
            {
                name: 'ephemeral',
                description: 'Whether to show the results in an ephemeral message',
                defaultValue: 'true',
            }
        ]
    },
    data: new SlashCommandBuilder()
    .setName('fbos')
    .setDescription('Lists all FBOs owned by the VA')
    .addBooleanOption((option) =>
        option
            .setName('ephemeral')
            .setDescription('Whether to show the results in an ephemeral message')
            .setRequired(false)
    ),
    async execute(interaction:Interaction, app:IBot):Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');

        if (ephemeral === null) {
            ephemeral = true;
        }
        
        await interaction.deferReply({ ephemeral: ephemeral });

        const fbos: OnAirFbo[] = await app.OnAir.getVAFBOs();

        if (!fbos || fbos.length === 0) {
            const reply:InteractionReplyOptions ={
                content: `No FBOs found for the VA.`,
                ephemeral: true,
            };
            
            await interaction.editReply(reply);
            return;
        }

        const pageSize = 10;
        let currentPage = 1;
        const totalPages = Math.ceil(fbos.length / pageSize);

        const createMessage = (page: number) => {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedFbos = fbos.slice(startIndex, endIndex);
            const fboList = FBOList(paginatedFbos);

            let msg = '';
            msg += `\nThe VA currently operates ${fbos.length} FBO${(fbos.length > 1) ? '\'s' : ''}:`;
            msg += `\n\`\`\`\n${fboList}\`\`\``;
            msg += `\nShowing Page ${page} of ${totalPages}.`;
            return msg;
        };

        const createButtons = (page: number) => {
            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('previous')
                        .setLabel('Previous')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page === 1),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page === totalPages)
                );
            return row;
        };

        const content = createMessage(currentPage);
        const buttons = createButtons(currentPage);
        const reply:InteractionReplyOptions = {
            content,
            ephemeral: ephemeral,
            components: [buttons],
        };

        const message = await interaction.editReply(reply);

        const collector = message.createMessageComponentCollector({ 
            time: 300000 // 5 minutes
        });

        collector.on('collect', async (i: ButtonInteraction) => {
            if (i.user.id !== interaction.user.id) {
                await i.reply({ content: 'You cannot use these buttons.', ephemeral: true });
                return;
            }

            if (i.customId === 'previous') {
                currentPage--;
            } else if (i.customId === 'next') {
                currentPage++;
            }

            await i.update({
                content: createMessage(currentPage),
                components: [createButtons(currentPage)]
            });
        });

        collector.on('end', () => {
            // Remove buttons when collector expires
            interaction.editReply({
                content: createMessage(currentPage),
                components: []
            }).catch(console.error);
        });
    },
};

export default FBOCommand;
