
import { Interaction, InteractionReplyOptions, SlashCommandBuilder, TextBasedChannel, TextBasedChannelFields, } from 'discord.js'
import { AirportResponse } from 'onair-api';
import { IBot } from '../interfaces';
import { AirportDetail } from '../messages'

export default {
	data: new SlashCommandBuilder()
    .setName('prune')
	.setDescription('Prunes a number of messages')
    .addIntegerOption((option:any) =>
        option.setName('count')
            .setDescription('Number of messages to prune')
            .setRequired(true)
    ),
    async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        const count:number = interaction.options.getInteger('count') as number;
        await interaction.deferReply({ ephemeral: true })
        const channel:TextBasedChannelFields = interaction.channel as TextBasedChannelFields;
        const messages = await channel.messages.fetch({ limit: count });

        await channel.bulkDelete(messages);

        const reply:InteractionReplyOptions = {
            content: `Deleted ${count} messages`,
            ephemeral: true
        };
        
        await interaction.editReply(reply);
    }
}
