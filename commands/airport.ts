import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js'
import { AirportResponse } from 'onair-api';
import { IBot } from '../interfaces';
import { AirportDetail } from '../messages'

export default {
	data: new SlashCommandBuilder()
	.setName('airport')
	.setDescription('Replies with the OnAir details for a given airport')
    .addStringOption((option:any) =>
		option.setName('icao')
			.setDescription('Airport ICAO')
            .setRequired(true)
    )
    .addBooleanOption(option =>
        option.setName('ephemeral')
            .setDescription('Whether to show the results in an ephemeral message')
            .setRequired(false)
    ),
    
	async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;

        const icao:string = interaction.options.getString('icao') as string;
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        if (ephemeral === null) {
            ephemeral = true
        }
        await interaction.deferReply({ ephemeral: ephemeral })

        let msg = ''


        const x:AirportResponse = await app.OnAir.getAirportByICAO(icao);

        if (!x) msg = 'No airport found'
        
        if (x) {
            msg = `\n${AirportDetail(x)}`
        }

        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: ephemeral
        };
        
        await interaction.editReply(reply);
	}
}
