import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js';
import {
    Aircraft as OnAirAircraft,
    Flight as OnAirFlight,
    VirtualAirline as OnAirVirtualAirline,
    Member as OnAirMember,
} from 'onair-api';
import { IBot } from '../interfaces';
import { VADetail } from '../messages';
import { SlashCommand } from 'types';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';

export interface VirtualAirlineDetail extends OnAirVirtualAirline {
    MemberCount:number;
    Members: OnAirMember[]
    FleetCount:number;
    FlightCount:number;
    FlightHours:number;
}

const VADetailCommand:SlashCommand = {
    name: 'detail',
    description: 'OnAir VA detail',
    roleName: 'member',
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
        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }
        
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        if (ephemeral === null) {
            ephemeral = true;
        }
        await interaction.deferReply({ ephemeral: ephemeral });

        let msg = '';
    
        const va:OnAirVirtualAirline = await app.OnAir.getVADetail();
        const members:OnAirMember[] = await app.OnAir.getVAMembers();
        const fleet:OnAirAircraft[] = await app.OnAir.getVAFleet();
        const flights:OnAirFlight[] = await app.OnAir.getVAFlights();
        const flightHours:number = flights.reduce((a:number, b:OnAirFlight) => {
            if (b.AirborneTime) {
                return a + parseFloat(b.AirborneTime);
            }

            return a;
        }, 0);
                
        const x:VirtualAirlineDetail = {
            ...va,
            MemberCount: members.length,
            Members: members,
            FleetCount: fleet.length || 0,
            FlightCount: flights.length || 0,
            FlightHours: flightHours,
        };

        if (!x) msg = 'No VA found';

        if (x) {
            msg += `\n${VADetail(x)}`;
        }

        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: ephemeral,
        };
        
        await interaction.editReply(reply);
    }
};

export default VADetailCommand;
