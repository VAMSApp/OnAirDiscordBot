import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js';
import { Job as OnAirJob } from 'onair-api';
import { IBot } from '../interfaces';
import { JobsList } from '../messages';
import { SlashCommand } from 'types';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';
import HandleDiscordCommandError from '@/lib/HandleDiscordCommandError';

const VAJobsCommand:SlashCommand = {
    name: 'jobs',
    description: 'Replies with the OnAir VA\'s pending jobs',
    roleName: 'member',
    help:  {
        name: 'jobs',
        description: 'Usage: `/jobs`\n\nExample: `/jobs`',
        params: [
            {
                name: 'page',
                description: 'What page of the job list to show',
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
            },
            {
                name: 'showcompleted',
                description: 'Whether to show completed jobs, defaults to false',
                defaultValue: 'false',
            }
        ]
    },
    data: new SlashCommandBuilder()
        .setName('jobs')
        .setDescription('Replies with the OnAir VA\'s pending jobs')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('What page of the job list to show')
                .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('size')
                .setDescription('How many results to show, maximum of 10')
                .setMaxValue(10)
                .setMinValue(1)
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether to show the results in an ephemeral message')
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option.setName('showcompleted')
                .setDescription('Whether to show completed jobs, defaults to false')
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
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        const showCompleted:boolean = interaction.options.getBoolean('showcompleted') as boolean|| false;
        
        if (ephemeral === null) {
            ephemeral = true;
        }

        await interaction.deferReply({ ephemeral: ephemeral });

        let msg = '';     

        const x:OnAirJob[] = await app.OnAir.getVAJobs(undefined, showCompleted);

        if (!x) msg = `No ${(showCompleted) ? 'completed': 'pending'} jobs found`;

        if (x) {
            msg = 'There ';

            if (x.length <= 0) {
                msg += `are no ${(showCompleted) ? 'completed': 'in-progress/pending'} VA Jobs`;
            } else if (x.length == 1) {
                msg += `is ${x.length} ${(showCompleted) ? 'completed': 'pending'} VA Job`;
            } else {
                msg += `are ${x.length} ${(showCompleted) ? 'completed': 'pending'} VA Jobs`;
            }

            msg += `\n\nShowing page ${page} of ${(Math.ceil(x.length / size) > 0) ? Math.ceil(x.length / size) : 1}`;

            const slicedX = x.slice((page - 1) * size, page * size);
            
            const jobsList = JobsList(slicedX);
            msg += `\n${jobsList}`;
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

export default VAJobsCommand;
