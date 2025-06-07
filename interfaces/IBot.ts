import { DiscordUserRepo } from '@/db/DiscordUserRepo';
import { ILogger, IOnAir } from '.';
import { BotConfig, Command } from '../types';
import { Channel, Client, Collection, Message, TextChannel } from 'discord.js';
import { CompanyRepo } from '@/db/CompanyRepo';
import { IDatabaseRepositories } from '@/db';

export interface IBot {
    config: BotConfig;
    log: ILogger;
    client: Client;
    OnAir: IOnAir;
    commands: Collection<string, Command>;
    DB: IDatabaseRepositories;
    loadCommands(): Promise<void>;
    deployCommands(): Promise<void>;
    login(): void;
    onReady(): void;
    getChannel(channelId:string): Promise<Channel|TextChannel|null>
    sendMessageToChannel(channelId:string, message:string): Promise<Message<true>|undefined>
    getRoleId(roleName: string): string;
}
