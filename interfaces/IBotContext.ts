import { BotConfig } from '../types';
import { ILogger, IOnAir } from '.';
import { Client } from 'discord.js';

export interface IBotContext {
    config: BotConfig;
    log: ILogger;
    client?: Client;
    OnAir:  IOnAir;
}
