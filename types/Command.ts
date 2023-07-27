import { Interaction } from 'discord.js';
import { IBot } from '../interfaces';

export type Command = {
    data: {
        name: string;
        description: string;
    },
    execute: (interaction: Interaction, app:IBot) => Promise<void>;
}
