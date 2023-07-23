import { GatewayIntentBits } from 'discord.js';

export type DiscordConfig = {
    enabled: boolean;
    token: string;
    clientId: string;
    guildId: string;
    deployCommands: boolean;
    onConnectNotice: boolean;
    onConnectNoticeAutoDelete: boolean;
    onConnectNoticeAutoDeleteAfter: number;
    intents: GatewayIntentBits[];
    owners: string[];
    channels: {
        [key: string]: string;
    };
    roles: RoleList|undefined;
}

export type RoleList = {
    [key:string]: string;
}
