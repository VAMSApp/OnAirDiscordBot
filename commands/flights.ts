import { OnAirApiQueryOptions, SlashCommand } from '../types';
import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js';
import { Flight as OnAirFlight } from 'onair-api';
import { IBot } from '../interfaces';
import { FlightsList } from '../messages';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';

const FlightsCommand:SlashCommand = {
    name: 'flights',
    description: 'Replies with the OnAir VA\'s current flights',
    roleName: 'member',
    data: new SlashCommandBuilder()
        .setName('flights')
        .setDescription('Replies with the OnAir VA\'s current flights')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('What page of the flights list to show')
                .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('size')
                .setDescription('How many results to show, maximum of 10')
                .setMaxValue(10)
                .setMinValue(1)
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('aircraftcode')
                .setDescription('Filter by aircraft ICAO')
                .setMinLength(1)
                .setMaxLength(6)
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('companycode')
                .setDescription('Filter by company ICAO')
                .setMinLength(1)
                .setMaxLength(6)
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('sortby')
                .setDescription('How to sort the results')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('sortorder')
                .setDescription('What order to sort the results')
                .setRequired(false)
        )
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
        
        const page:number = interaction.options.getInteger('page') || 1;
        let size:number = interaction.options.getInteger('size') || 5;
        const aircraftCode:string|undefined = interaction.options.getString('aircraftcode') || undefined;
        const companyCode:string|undefined = interaction.options.getString('companycode') || undefined;
        const sortBy:string = interaction.options.getString('sortby') || 'StartTime';
        const sortOrder:string = interaction.options.getString('sortorder') || 'desc';
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        if (ephemeral === null) {
            ephemeral = true;
        }

        await interaction.deferReply({ ephemeral: ephemeral });

        let msg = '';
        
        const queryOpts: OnAirApiQueryOptions = {
            filter: {
                aircraftCode: aircraftCode,
                companyCode: companyCode,
            },
            sortBy: sortBy,
            sortOrder: sortOrder,
        };

        const x:OnAirFlight[] = await app.OnAir.getVAFlights(queryOpts);

        if (!x) msg = 'No flights found';

        if (x) {

            if (size) {
                if (size && size > 5) {
                    size = 5;
                }
            }

            const slicedX:OnAirFlight[] = x.slice((page - 1) * size, page * size);

            msg = `There ${(x.length > 1 ) ? 'are' : 'is'} currently ${x.length} active flight${(x.length > 1 ) ? 's' : ''} in the VA flight Log`;

            msg += `\nSorting by ${sortBy} in ${sortOrder} order`;
            msg += `\n\nShowing page ${page} of ${(Math.ceil(x.length / size) > 0) ? Math.ceil(x.length / size) : 1}`;

            const flightsList:string|undefined = FlightsList(slicedX);
            
            if (!flightsList) {
                msg = '\nNo flights found';
            }

            msg += `\n${flightsList}`;
        }

        const reply:InteractionReplyOptions = {
            content: `\`\`\`\n${msg}\`\`\``,
            ephemeral: ephemeral,
        };

        await interaction.editReply(reply);
        return;
    }
};

export default FlightsCommand;
