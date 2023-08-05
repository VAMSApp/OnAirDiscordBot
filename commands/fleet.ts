import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js';
import { Aircraft as OnAirAircraft } from 'onair-api';
import { IBot } from '../interfaces';
import { FleetList } from '../messages';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';
import { OnAirApiQueryOptions } from '@/types';
import HandleDiscordCommandError from '@/lib/HandleDiscordCommandError';

export default {
    name: 'fleet',
    description: 'Replies with the OnAir VA\'s fleet',
    roleName: 'member',
    help: {
        name: 'fleet',
        description: 'Usage: `/fleet`\n\nExample: `/fleet`',
        params: [
            {
                name: 'page',
                description: 'What page of the fleet list to show',
                defaultValue: '1',
            },
            {
                name: 'size',
                description: 'How many results to show, maximum of 10',
                defaultValue: '5',
            },
            {
                name: 'ephemeral',
                description: 'Whether to show the results in an ephemeral message',
                defaultValue: 'true',
            }
        ]
    },
    data: new SlashCommandBuilder()
        .setName('fleet')
        .setDescription('Replies with the OnAir VA\'s fleet')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('What page of the fleet list to show')
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
            option.setName('sortby')
                .setDescription('How to sort the results')
                .setRequired(false)
                .addChoices(
                    { name: 'Type', value: 'type' },
                    { name: 'Identifier', value: 'identifier' },
                    { name: 'Status', value: 'status' },
                    { name: 'Airport', value: 'airport' },
                )
        )
        .addStringOption(option =>
            option.setName('sortorder')
                .setDescription('What order to sort the results')
                .setRequired(false)
                .addChoices(
                    { name: 'Ascending', value: 'asc' },
                    { name: 'Descending', value: 'desc' },
                )
        )
        .addBooleanOption(option =>
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
        
        const page:number = interaction.options.getInteger('page') || 1;
        const size:number = interaction.options.getInteger('size') || 5;
        const sortBy:string = interaction.options.getString('sortby') || 'StartTime';
        const sortOrder:string = interaction.options.getString('sortorder') || 'desc';
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        
        if (ephemeral === null) {
            ephemeral = true;
        }

        await interaction.deferReply({ ephemeral: ephemeral });

        let msg = '';

        const opts:OnAirApiQueryOptions = {
            sortBy: sortBy,
            sortOrder: sortOrder,
        };
        
        const x:OnAirAircraft[] = await app.OnAir.getVAFleet(opts);
        if (!x) msg = 'No fleet found';

        if (x) {
            msg = 'There ';

            if (x.length <= 0) {
                msg += 'are no aircraft in the VA fleet yet';
            } else if (x.length == 1) {
                msg += `is ${x.length} aircraft currently in the VA fleet`;
            } else {
                msg += `are ${x.length} aircraft currently in the VA fleet`;
            }

            msg += `\n\nShowing page ${page} of ${(Math.ceil(x.length / size) > 0) ? Math.ceil(x.length / size) : 1}`;
            
            const slicedX = x.slice((page - 1) * size, page * size);

            const fleetList = FleetList(slicedX);
            msg += `\n${fleetList}`;
        }


        try {
            const reply:InteractionReplyOptions = {
                content: `\`\`\`\n${msg}\`\`\``,
                ephemeral: ephemeral,
            };
    
            await interaction.editReply(reply);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err:any) {
            const msg = HandleDiscordCommandError(err, app);

            const reply:InteractionReplyOptions = {
                content: `\`\`\`\n${msg}\`\`\``,
                ephemeral: true,
            };

            await interaction.editReply(reply);
            return;
        }
    }
};
