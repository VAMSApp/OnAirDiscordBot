import { Interaction } from 'discord.js';
import { IBot } from '../interfaces';
import { HelpText } from './SlashCommand';

export type Command = {
    help: HelpText;
    data: {
        name: string;
        description: string;
    },
    execute: (interaction: Interaction, app:IBot) => Promise<void>;
}
