import { Interaction, InteractionReplyOptions, SlashCommandBuilder, } from 'discord.js'
import { Aircraft as OnAirAircraft } from 'onair-api';
import { IBot } from '../interfaces';
import { FleetList } from '../messages'

export default {
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
    .addBooleanOption(option =>
        option.setName('ephemeral')
            .setDescription('Whether to show the results in an ephemeral message')
            .setRequired(false)
    ),
	async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        
        const page:number = interaction.options.getInteger('page') || 1;
        let size:number = interaction.options.getInteger('size') || 5;
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        
        if (ephemeral === null) {
            ephemeral = true
        }
        await interaction.deferReply({ ephemeral: ephemeral })

        let msg = ''


        let x = await app.OnAir.getVAFleet()
        if (!x) msg = 'No fleet found'

        if (x) {
            msg = 'There '

            if (x.length <= 0) {
                msg += 'are no aircraft in the VA fleet yet'
            } else if (x.length == 1) {
                msg += `is ${x.length} aircraft currently in the VA fleet`
            } else {
                msg += `are ${x.length} aircraft currently in the VA fleet`
            }

            msg += `\n\nShowing page ${page} of ${(Math.ceil(x.length / size) > 0) ? Math.ceil(x.length / size) : 1}`

            if (size) {
                if (size && size > 5) {
                    size = 5
                }
            }
            
            const slicedX = x.slice((page - 1) * size, page * size)

            const fleetList = FleetList(slicedX)
            msg += `\n${fleetList}`
        }

        const reply:InteractionReplyOptions = {
            content: `\`\`\`\n${msg}\`\`\``,
            ephemeral: ephemeral
        }
        
        await interaction.editReply(reply);
	}
}
