export type DiscordConfig = {
    enabled: boolean;
    token: string;
    clientId: string;
    guildId: string;
    deployCommands: boolean;
    onConnectNotice: boolean;
    onConnectNoticeAutoDelete: boolean;
    onConnectNoticeAutoDeleteAfter: number;
    intents: any;
    owners: string[];
    channels: {
        [key: string]: string;
    };
    roles: {
        [key:string]: string;
    };
}
