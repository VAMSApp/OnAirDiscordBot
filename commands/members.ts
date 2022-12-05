import { matches } from 'lodash'
import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js'
import { MembersResponse } from 'onair-api';
import { IBot } from '../interfaces';
import { MembersList } from '../messages'

export default {
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
            .setDescription(`Sort the results by columns`)
            .setRequired(false)
    )
    .addBooleanOption(option =>
        option.setName('ephemeral')
            .setDescription('Whether to show the results in an ephemeral message')
            .setRequired(false)
    ),
	async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        if (!app.config.onair.sorting.Members || (typeof app.config.onair.sorting.Members === 'boolean' && app.config.onair.sorting.Members !== true)) return;
        const sortingBy:boolean|string[] = app.config.onair.sorting.Members
        const sortBy:string = interaction.options.getString('sortby') || 'Role';
        const sortOrder:string = interaction.options.getString('sortorder') || 'desc';
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        
        if (ephemeral === null) {
            ephemeral = true
        }
        await interaction.deferReply({ ephemeral: ephemeral })

        if (typeof sortingBy !== 'boolean' && !sortingBy.indexOf(sortBy)) {
            
            const reply:InteractionReplyOptions = {
                content: 'Invalid sort column. Available columns are: ' + sortingBy.join(', '),
                ephemeral: true
            }
        
            await interaction.editReply(reply);
        };

        let msg:string = ''

        const x:MembersResponse = await app.OnAir.getVAMembers({
            sortBy: sortBy,
            sortOrder: sortOrder,
        });

        if (!x) msg = 'No VA members found'
        msg = `\n${MembersList(x)}`

        const reply:InteractionReplyOptions = {
            content: `\`\`\`\n${msg}\`\`\``,
            ephemeral: ephemeral,
        }
        await interaction.editReply(reply);
	}
}
