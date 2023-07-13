import { Interaction, InteractionReplyOptions, SlashCommandBuilder } from 'discord.js';
import { Aircraft as OnAirAircraft, } from 'onair-api';
import { IBot } from '../interfaces';
import IsAuthorizedToRunCommand from '../lib/IsAuthorizedToRunCommand';
import { SlashCommand } from '../types';
import { AircraftDetail } from '../messages';


const AircraftCommand:SlashCommand = {
    name: 'aircraft',
    description: 'Replies with the OnAir details for a given aircraft',
    roleName: 'member',
    data: new SlashCommandBuilder()
        .setName('aircraft')
        .setDescription('Replies with the OnAir details for a given aircraft')
        .addStringOption((option) => 
            option
                .setName('identifier')
                .setDescription('The aircraft identifier')
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
        
        const ephemeral:boolean = interaction.options.getBoolean('ephemeral') || true;
        const identifier:string = interaction.options.getString('identifier') as string;

        await interaction.deferReply({ ephemeral: ephemeral });

        // find the aircraft by Identifier in the fleet array of OnAirAircraft
        const aircraft:OnAirAircraft|undefined = await app.OnAir.getAircraftDetailByIdentifier(identifier);

        if (!aircraft) {
            const reply:InteractionReplyOptions = {
                content: `No aircraft found with identifier ${identifier}`,
                ephemeral: ephemeral
            };
            
            await interaction.editReply(reply);
            return;
        }

        const msg:string|void = AircraftDetail(aircraft);
        if (!msg) {
            const reply:InteractionReplyOptions = {
                content: 'Error generating aircraft details',
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
    }
};

export default AircraftCommand;
