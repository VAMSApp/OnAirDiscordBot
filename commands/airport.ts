import { Interaction, InteractionReplyOptions, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption, } from 'discord.js';
import { Airport as OnAirAirport } from 'onair-api';
import { IBot } from '../interfaces';
import { AirportDetail } from '../messages';
import { SlashCommand, } from '../types';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';

const AirportCommand:SlashCommand = {
    name: 'airport',
    description: 'Replies with the OnAir details for a given airport',
    roleName: 'member',
    data: new SlashCommandBuilder()
        .setName('airport')
        .setDescription('Replies with the OnAir details for a given airport')
        .addStringOption((option:SlashCommandStringOption) =>
            option.setName('icao')
                .setDescription('Airport ICAO')
                .setRequired(true)
        )
        .addBooleanOption((option:SlashCommandBooleanOption) =>
            option.setName('ephemeral')
                .setDescription('Whether to show the results in an ephemeral message')
                .setRequired(false)
        ),
    async execute(interaction:Interaction, app:IBot):Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        const icao:string = interaction.options.getString('icao') as string;
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        if (ephemeral === null) {
            ephemeral = true;
        }
        await interaction.deferReply({ ephemeral: ephemeral });

        let msg = '';


        const x:OnAirAirport = await app.OnAir.getAirportByICAO(icao);

        if (!x) msg = 'No airport found';
        
        if (x) {
            msg = `\n${AirportDetail(x)}`;
        }

        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: ephemeral
        };
        
        await interaction.editReply(reply);
    }
};

export default AirportCommand;
