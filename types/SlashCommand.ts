import { Interaction, SlashCommandBuilder } from 'discord.js';
import { IBot } from 'interfaces';


export type HelpText = {
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: string;
    params?: HelpText[];
}

export type SlashCommand = {
    name: string;
    description: string;
    roleName: string;
    help?: string|undefined|HelpText;
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    execute: (interaction: Interaction, app: IBot) => Promise<void>;
}