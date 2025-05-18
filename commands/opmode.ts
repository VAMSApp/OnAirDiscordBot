// dev slash command

import { IBot } from "@/interfaces";
import IsAuthorizedToRunCommand from "@/lib/IsAuthorizedToRunCommand";
import { SlashCommand } from "@/types";
import { SlashCommandBuilder } from "discord.js";
import { Interaction } from "discord.js";

const OpModeCommand:SlashCommand = {
    name: 'opmode',
    description: 'Queries the OnAir bot operating mode',
    roleName: 'admin',
    help: {
        name: 'opmode',
        description: 'Queries the OnAir bot operating mode',
        params: [],
    },
    data: new SlashCommandBuilder()
        .setName('opmode')
        .setDescription('Queries the OnAir bot operating mode'),
    async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        await interaction.deferReply({ ephemeral: true });

        const msg = `The OnAir bot is currently operating in ${app.config.onair.opMode} mode.`;

        await interaction.editReply({ content: msg });

    }
};

export default OpModeCommand;