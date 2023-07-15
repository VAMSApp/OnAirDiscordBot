import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js';
import { IBot } from '../interfaces';
import { MembersList } from '../messages';
import { OnAirApiQueryOptions, SlashCommand } from 'types';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';
import { MemberWithRelations } from '@/repos';
import { Member as OnAirMember } from 'onair-api';

const MembersCommand:SlashCommand = {
    name: 'members',
    description: 'Replies with the OnAir VA members',
    roleName: 'member',
    data: new SlashCommandBuilder()
        .setName('members')
        .setDescription('Replies with the OnAir VA members')
        .addStringOption(option =>
            option.setName('sortorder')
                .setDescription('What order to sort the results')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('sortby')
                .setDescription('Sort the results by columns')
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

        if (!app.config.onair.sorting.Members) return;
        const validSortingBy:string[] = app.config.onair.sorting.Members;
        const sortBy:string = interaction.options.getString('sortby') || 'role';
        const sortOrder:string = interaction.options.getString('sortorder') || 'asc';
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        
        if (ephemeral === null) {
            ephemeral = true;
        }
        
        await interaction.deferReply({ ephemeral: ephemeral });

        let msg:string = '';

        if (validSortingBy.indexOf(sortBy) < 0) {
            
            const reply:InteractionReplyOptions = {
                content: `Invalid sort column '${sortBy}'. Available columns are:  ${validSortingBy.join(', ')}`,
                ephemeral: true
            };
        
            await interaction.editReply(reply);
            return;
        }
        

        const opts:OnAirApiQueryOptions = {
            sortBy,
            sortOrder,
        };
        
        const x:MemberWithRelations[]|OnAirMember[] = await app.OnAir.loadVAMembers(opts);

        if (!x) {
            msg = 'No VA members found';
            const reply:InteractionReplyOptions = {
                content: `\`\`\`\n${msg}\`\`\``,
                ephemeral: ephemeral,
            };
            await interaction.editReply(reply);

            return;
        }

        msg = `Showing ${x.length} VA members for **${app.OnAir.VirtualAirline?.AirlineCode} ${app.OnAir.VirtualAirline?.Name}**\n`;
        msg += `Sorted by the **${sortBy}** field in **${sortOrder.toUpperCase()}** order.\n`;
        const membersList:string|void = MembersList(x);
        
        if (!membersList) {
            msg = 'Unable to generate members list';
            const reply:InteractionReplyOptions = {
                content: `\`\`\`\n${msg}\`\`\``,
                ephemeral: ephemeral,
            };

            await interaction.editReply(reply);
            return;
        }
        
        msg += `\`\`\`\n${membersList}\`\`\``;

        const reply:InteractionReplyOptions = {
            content: msg,
            ephemeral: ephemeral,
        };
        
        await interaction.editReply(reply);
    }
};

export default MembersCommand;
