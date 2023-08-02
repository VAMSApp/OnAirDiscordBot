import { ILogger, IOnAir } from '.';
import { BotConfig, Command } from '../types';
import { Client, Collection } from 'discord.js';

export interface IBot {
    config: BotConfig;
    log: ILogger;
    client: Client;
    OnAir: IOnAir;
    commands: Collection<string, Command>;

    loadCommands(): Promise<void>;
    deployCommands(): Promise<void>;
    login(): void;
    onReady(): void;
    getChannelId(channelName: string): string;
    getRoleId(roleName: string): string;
}
