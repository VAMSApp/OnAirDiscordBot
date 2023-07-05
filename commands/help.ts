
import { Interaction, InteractionReplyOptions, SlashCommandBuilder, TextBasedChannel, TextBasedChannelFields, } from 'discord.js'
import { IBot } from '../interfaces';

export default {
	data: new SlashCommandBuilder()
    .setName('help')
	.setDescription('Shows the basic help menu'),
    async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        const count:number = interaction.options.getInteger('count') as number;
        await interaction.deferReply({ ephemeral: true })

        setTimeout(async () => {
            const reply:InteractionReplyOptions = {
                content: `\n\nhelp is coming soon...\n\n🚣\n\n`,
                ephemeral: true
            };
        
            await interaction.editReply(reply);  
        }, 1500);
    }
}
