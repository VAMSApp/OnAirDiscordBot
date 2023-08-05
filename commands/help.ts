import { IBot } from '@/interfaces';
import HandleDiscordCommandError from '@/lib/HandleDiscordCommandError';
import IsAuthorizedToRunCommand from '@/lib/IsAuthorizedToRunCommand';
import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js';
import { SlashCommand } from 'types';


const HelpCommand:SlashCommand = {
    name: 'help',
    description: 'Replies with the help message',
    roleName: 'member',
    help: {
        name: 'help',
        description: 'Usage: `/help`\n\nExample: `/help`',
        params: [
            {
                name: 'command',
                description: 'The command to get help for',
            },
            {
                name: 'ephemeral',
                description: 'Whether to show the results in an ephemeral message',
                defaultValue: 'true',
            }
        ]
    },
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with the help message')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to get help for')
                .setRequired(false)
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

        const command:string|null = interaction.options.getString('command');

        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');

        if (ephemeral === null) {
            ephemeral = true;
        }

        await interaction.deferReply({ ephemeral: ephemeral });
        
        if (command) {
            // TODO: get help for a specific command
        } else {
            const msg = 'This bot is designed to help you interact with the OnAir API from Discord.\n'
            + 'The bot is currently in development, so not all features are available.\n'
            + 'If you have any questions, please contact `@ndboost`\n'
            + '**Commands:**\n'
            + '```\n'
            + '  /help - this help message\n'
            + '  /aircraft <identifier> - get details for an aircraft\n'
            + '  /airport <identifier> - get details for an airport\n'
            + '  /flights - show all current flights\n'
            + '  /fleet - show all VA aircraft in the fleet\n';
            + '  /members - show all VA members\n';
            + '  /detail - show details for the VA\n';
            + '  /jobs - shows all current jobs\n';
            + '```\n';

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
    }
};

export default HelpCommand;