import { RedisOptions } from 'ioredis';
import { OnAirConfig } from '.';
import { DiscordConfig } from './DiscordConfig';

export type RedisConfig = {
    host?: string|undefined;
    port?: number|undefined;
    password?: string|undefined;
    db?: string|undefined;
}

export type BotConfig = {
    discord: DiscordConfig;    
    onair: OnAirConfig;
    log: {
        logLevel: string;
        logToConsole: boolean;
    }
    redis?: RedisOptions;
}
