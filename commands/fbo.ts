import { Interaction, InteractionReplyOptions, SlashCommandBuilder } from 'discord.js';
import { Fbo as OnAirFbo, } from 'onair-api';
import { IBot } from '../interfaces';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';
import { SlashCommand } from '../types';
import { FBODetail } from '../messages';


const FBOCommand:SlashCommand = {
    name: 'fbo',
    description: 'Get details of an FBO at an airport',
    roleName: 'member',
    help:  {
        name: 'fbo',
        description: 'Usage: `/fbo <icao>`\n\nExample: `/fbo KATL`',
        params: [
            {
                name: 'icao',
                description: 'ICAO code of the airport the FBO is located at',
                required: true
            },
            {
                name: 'ephemeral',
                description: 'Whether to show the results in an ephemeral message',
                defaultValue: 'true',
            }
        ]
    },
    data: new SlashCommandBuilder()
    .setName('fbo')
    .setDescription('Get FBO details')
    .addStringOption(option =>
        option.setName('icao')
            .setDescription('ICAO code of the airport')
            .setRequired(true)
    )
    .addBooleanOption((option) =>
        option
            .setName('ephemeral')
            .setDescription('Whether to show the results in an ephemeral message')
            .setRequired(false)
    ),
    async execute(interaction:Interaction, app:IBot):Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        const icao = interaction.options.getString('icao', true);    

        if (ephemeral === null) {
            ephemeral = true;
        }
        
        await interaction.deferReply({ ephemeral: ephemeral });

        const fbos: OnAirFbo[] = await app.OnAir.getVAFBOs();
        const fbo: OnAirFbo | undefined = fbos.find((fbo: OnAirFbo) => fbo.Airport.ICAO === icao.toUpperCase());

        if (!fbo) {
            const reply:InteractionReplyOptions ={
                content: `FBO not found for ICAO ${icao}`,
                ephemeral: true,
            };
            
            await interaction.editReply(reply);
            return;
        }

        let msg: string|void = FBODetail(fbo);

        if (!msg) {
            const reply:InteractionReplyOptions = {
                content: 'Error generating FBO details',
                ephemeral: ephemeral
            };
            
            await interaction.editReply(reply);
            return;
        }

        const reply:InteractionReplyOptions = {
            content: `\`\`\`\n${msg}\`\`\``,
            ephemeral: ephemeral,
        };

        await interaction.editReply(reply);
        return;
    },
};

export default FBOCommand;
