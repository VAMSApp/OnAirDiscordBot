// dev slash command

import { IBot } from "@/interfaces";
import IsAuthorizedToRunCommand from "@/lib/IsAuthorizedToRunCommand";
import { SlashCommand } from "@/types";
import { SlashCommandBuilder } from "discord.js";
import { Interaction } from "discord.js";

const dev:SlashCommand = {
    name: 'dev',
    description: 'Developer commands',
    roleName: 'admin',
    help: {
        name: 'dev',
        description: 'Developer commands',
        params: [],
    },
    data: new SlashCommandBuilder()
        .setName('dev')
        .setDescription('Developer commands'),
    async execute(interaction:Interaction, app:IBot) {
        if (!interaction.isChatInputCommand()) return;
        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }
        
        let ephemeral:boolean|null = interaction.options.getBoolean('ephemeral');
        if (ephemeral === null) {
            ephemeral = true;
        }

        await interaction.deferReply({ ephemeral: ephemeral });

        const msg = ``;

        await interaction.editReply({ content: msg });

    }
};

export default dev;