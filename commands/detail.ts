import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js'
import { VirtualAirlineResponse } from 'onair-api';
import { IBot } from '../interfaces';
import { VADetail } from '../messages'

export default {
	data: new SlashCommandBuilder()
	.setName('detail')
	.setDescription('OnAir VA detail')
    .addBooleanOption(option =>
        option.setName('ephemeral')
            .setDescription('Whether to show the results in an ephemeral message')
            .setRequired(false)
    ),    
	async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        if (ephemeral === null) {
            ephemeral = true
        }
        await interaction.deferReply({ ephemeral: ephemeral })

        let msg = ''
    
        const x:VirtualAirlineResponse = await app.OnAir.getVirtualAirlineDetails();
        if (!x) msg = 'No VA found'

        if (x) {
            msg += `\n${VADetail(x)}`
        }

        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: ephemeral,
        };
        
        await interaction.editReply(reply);
	}
}
