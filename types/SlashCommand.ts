import { Interaction, SlashCommandBuilder } from 'discord.js';
import { IBot } from 'interfaces';

export type SlashCommand = {
    name: string;
    description: string;
    roleName: string;
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    execute: (interaction: Interaction, app: IBot) => Promise<void>;
}
