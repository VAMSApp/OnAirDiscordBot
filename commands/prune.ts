import { IBot } from '@/interfaces';
import IsAuthorizedToRunCommand from '@/lib/IsAuthorizedToRunCommand';
import { SlashCommand } from '@/types';
import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, TextChannel, Interaction } from 'discord.js';

const data = new SlashCommandBuilder()
.setName('prune')
.setDescription('Prune messages from the current channel')
.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
.addIntegerOption(option =>
    option.setName('amount')
        .setDescription('Number of messages to prune (1-100, defaults to 100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(false)
)
.addBooleanOption(option =>
    option.setName('all')
        .setDescription('Prune all messages (defaults to false)')
        .setRequired(false)
);

const PruneCommand:SlashCommand = {
    name: 'prune',
    description: 'Prune messages from the current channel',
    roleName: 'admin',
    help:  {
        name: 'prune',
        description: 'Usage: `/prune [amount] [all]`\n\nExample: `/prune` (deletes 100 messages)\nExample: `/prune 50` (deletes 50 messages)\nExample: `/prune all=true` (deletes all messages)',
        params: [
            {
                name: 'amount',
                description: 'Number of messages to prune (1-100, defaults to 100)',
                required: false,
                defaultValue: '100'
            },
            {
                name: 'all',
                description: 'Prune all messages (defaults to false)',
                required: false,
                defaultValue: 'false'
            }
        ]
    },
    data: data,
    async execute(interaction:Interaction, app:IBot):Promise<void> {
        if (!interaction.isChatInputCommand()) return;  

        if (!interaction.channel || !(interaction.channel instanceof TextChannel)) {
            await interaction.reply({ 
                content: 'This command can only be used in text channels.',
                ephemeral: true 
            });
            return;
        }      
        
        const ownerId = app.config.discord.owner;
        if (interaction.user.id !== ownerId) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        // Get parameters with defaults
        const amount = interaction.options.getInteger('amount') ?? 100;
        const pruneAll = interaction.options.getBoolean('all') ?? false;

        try {
            // Send initial response
            await interaction.reply({
                content: `Starting to prune messages...`,
                ephemeral: true
            });

            let totalDeleted = 0;
            let remainingToDelete = amount;
            const BATCH_SIZE = 100;

            while (remainingToDelete > 0) {
                const batchSize = Math.min(remainingToDelete, BATCH_SIZE);
                const deleted = await interaction.channel.bulkDelete(batchSize, true);
                
                totalDeleted += deleted.size;
                remainingToDelete -= deleted.size;
                
                // If we got fewer messages than requested, we've hit the end
                if (deleted.size < batchSize) {
                    break;
                }
                
                // Wait to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Update the response with final count
            await interaction.editReply({
                content: `Successfully pruned ${totalDeleted} messages.`,
            });

        } catch (error) {
            app.log.error(`Error pruning messages: ${error}`);

            await interaction.editReply({
                content: 'There was an error trying to prune messages in this channel. Messages older than 14 days cannot be bulk deleted.',
            });
        }
    },
};

export default PruneCommand;