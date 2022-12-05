import { OnAirConfig } from '.';
import { DiscordConfig } from './DiscordConfig';

export type BotConfig = {
    discord: DiscordConfig;    
    onair: OnAirConfig;
    log: {
        level: string;
        logToConsole: boolean;
    }
    redis: {
        host: string;
        port: number;
        password: string;
        db: string;
    };
}
