import { ILogger, IOnAir } from '.';
import { BotConfig } from '../types';
import { Client } from 'discord.js';

export interface IBot {
    config: BotConfig;
    log: ILogger;
    client: Client;
    OnAir: IOnAir;

    loadCommands(): Promise<void>;
    deployCommands(): Promise<void>;
    login(): void;
    onReady(): void;
    getChannelId(channelName: string): string;
    getRoleId(roleName: string): string;
}
