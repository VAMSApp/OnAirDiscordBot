
import { Interaction, InteractionReplyOptions, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandBooleanOption, TextBasedChannelFields, PermissionFlagsBits, } from 'discord.js';
import { IBot } from '../interfaces';
import { SlashCommand } from 'types';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';

const PruneCommand:SlashCommand = {
    name: 'prune',
    description: 'Prunes a number of messages from the calling channel, requires the caller to have the \'owner\' role and Administrator privileges',
    roleName: 'owner',
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prunes a number of messages from the calling channel, requires the \'owner\' role')
        .addIntegerOption((option:SlashCommandIntegerOption) =>
            option.setName('count')
                .setDescription('Number of messages to prune, defaults to all')
        )
        .addBooleanOption((option:SlashCommandBooleanOption) =>
            option.setName('oldmessages')
                .setDescription('Whether to prune messages older than 14 days, defaults to false')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction:Interaction, app:IBot):Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        const count:number|null = interaction.options.getInteger('count') as number;
        const pruneOldMessages:boolean|null = interaction.options.getBoolean('oldmessages') as boolean;

        await interaction.deferReply({ ephemeral: true });

        const channel:TextBasedChannelFields = interaction.channel as TextBasedChannelFields;

        let fetchQuery;

        if (count !== null) {
            fetchQuery = { limit: count };
        }

        const messages = await channel.messages.fetch(fetchQuery);

        if (messages.size === 0) {
            const reply:InteractionReplyOptions = {
                content: 'No messages to delete',
                ephemeral: true
            };

            await interaction.editReply(reply);
            return;
        }

        await channel.bulkDelete(messages, pruneOldMessages);

        const reply:InteractionReplyOptions = {
            content: `Deleted ${messages.size} messages`,
            ephemeral: true
        };
        
        await interaction.editReply(reply);
        return;
    }
};

export default PruneCommand;
