import { ILogger, IOnAir } from '.'
import { BotConfig } from '../types'

export interface IBot {
    config: BotConfig;
    log: ILogger;
    client: any;
    OnAir: IOnAir;

    loadCommands(): Promise<void>;
    deployCommands(): Promise<void>;
    login(): void;
    onReady(): void;
    getChannelId(channelName: string): string;
    getRoleId(roleName: string): string;
}
