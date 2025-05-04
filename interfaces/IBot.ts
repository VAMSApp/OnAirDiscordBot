import { ILogger, IOnAir } from '.';
import { BotConfig, Command } from '../types';
import { Channel, Client, Collection, TextChannel } from 'discord.js';

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
    getChannel(channelId:string): Promise<Channel|TextChannel|null>
    getRoleId(roleName: string): string;
}
