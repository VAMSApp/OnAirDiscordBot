import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js';
import { IBot } from '@/interfaces';
import { CompanyDetail, VADetail } from '@/messages';
import { SlashCommand, OnAirVirtualAirline, OnAirMember, OnAirAircraft, OnAirFlight, OnAirVirtualAirlineDetail, OnAirCompany, OnAirCompanyDetail, OnAirEmployee } from '@/types';
import IsAuthorizedToRunCommand from '@/lib/IsAuthorizedToRunCommand';

const VADetailCommand:SlashCommand = {
    name: 'detail',
    description: 'OnAir VA or Company detail',
    roleName: 'member',
    help: {
        name: 'detail',
        description: 'Usage: `/detail`\n\nExample: `/detail`',
        params: [
            {
                name: 'ephemeral',
                description: 'Whether to show the results in an ephemeral message',
                defaultValue: 'true',
            }
        ]
    },
    data: new SlashCommandBuilder()
        .setName('detail')
        .setDescription('OnAir VA or Company detail')
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
    
        if (app.config.onair.opMode === 'VA') {
            const va:OnAirVirtualAirline = await app.OnAir.getVADetail() as OnAirVirtualAirline;
            const members:OnAirMember[] = await app.OnAir.getVAMembers();
            const fleet:OnAirAircraft[] = await app.OnAir.getVAFleet();
            const flights:OnAirFlight[] = await app.OnAir.getVAFlights();
            
            const flightHours:number = flights.reduce((a:number, b:OnAirFlight) => {
                if (b.AirborneTime) {
                    return a + parseFloat(b.AirborneTime);
                }

                return a;
            }, 0);
                
            const x:OnAirVirtualAirlineDetail = {
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
        } else {
            const company:OnAirCompany = await app.OnAir.getCompanyDetail();
            const fleet:OnAirAircraft[] = await app.OnAir.getCompanyFleet();
            const flights:OnAirFlight[] = await app.OnAir.getCompanyFlights();
            const employees:OnAirEmployee[] = await app.OnAir.getCompanyEmployees();
            
            const flightHours:number = flights.reduce((a:number, b:OnAirFlight) => {
                if (b.AirborneTime) {
                    return a + parseFloat(b.AirborneTime);
                }

                return a;
            }, 0);
            
            const x:OnAirCompanyDetail = {
                ...company,
                EmployeeCount: employees.length,
                Employees: employees,
                FleetCount: fleet.length || 0,
                FlightCount: flights.length || 0,
                FlightHours: flightHours,
            };

            if (!x) msg = 'No company found';

            if (x) {
                msg += `\n${CompanyDetail(x)}`;
            }
        }

        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: ephemeral,
        };
        
        await interaction.editReply(reply);
    }
};

export default VADetailCommand;
