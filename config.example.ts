import { GatewayIntentBits } from 'discord.js';
import { BotConfig } from './types';

const config:BotConfig = {
    discord: {
        enabled: true,
        token: '###_DISCORD_TOKEN_###',
        clientId: '###_DISCORD_CLIENTID_###',
        guildId: '###_DISCORD_GUILDID_###',
        deployCommands: true,
        onConnectNotice: false, // if set to true, bot will send a message to the channel specified in the 'OnConnectNoticeChannel' setting when it connects to Discord
        onConnectNoticeAutoDelete: true, // if set to true, bot will automatically delete the OnConnectNotice message after ${onConnectNoticeAutoDeleteAfter} milliseconds
        onConnectNoticeAutoDeleteAfter: 10000, // time in milliseconds to wait before deleting the OnConnectNotice message
        intents: [
            GatewayIntentBits.Guilds,
        ],
        roles: {
            member: '###_DISCORD_MEMBER-GROUP-ID_###',
            owner: '###_DISCORD_OWNER-GROUP-ID_###',
            verified: '###_DISCORD_VERIFIED-GROUP-ID_###',
            linked: '###_DISCORD_LINKED-GROUP-ID_###',
        },
        owners: [
            '###_DISCORD_OWNERID_###',
        ],
        channels: {
            'auth-signup': '###_DISCORD_CHANNEL_ID_###', // The channel to send auth signup event messages to
            'auth-signin': '###_DISCORD_CHANNEL_ID_###', // The channel to send auth signin event messages to
            'discord': '###_DISCORD_CHANNEL_ID_###', // The channel to send discord event messages to
            'OnConnectNoticeChannel': '###_DISCORD_CHANNEL_ID_###', // The channel to send OnConnectNotice event messages to
            'onair-notifications': '###_DISCORD_CHANNEL_ID_###', // The channel to send onair VA notification messages to
            'onair-vafleet': '###_DISCORD_CHANNEL_ID_###', // The channel to send onair VA notification messages to
            'onair-vajobs': '###_DISCORD_CHANNEL_ID_###', // The channel to send onair VA notification messages to
        },
        
    },
    onair: {
        enabled: true,
        keys: {
            companyId: '###_ONAIR_COMPANYID_###',
            vaId: '###_ONAIR_VAID_###',
            apiKey: '###_ONAIR_APIKEY_###',
        },
        events: {
            VirtualAirline: {
                autoDelete: true,
                autoDeleteAfter: 10000,
                enabled: false,
            },
            VAFleet: {
                autoDelete: true,
                autoDeleteAfter: 10000,
                enabled: false,
            },
            VAJob: {
                autoDelete: true,
                autoDeleteAfter: 10000,
                enabled: false,
            },
            VANotification: {
                autoDelete: true,
                autoDeleteAfter: 10000,
                enabled: false,
            },
            VAMember: {
                autoDelete: true,
                autoDeleteAfter: 10000,
                enabled: false,
            },
        },
        polling: {
            VirtualAirline: {
                notify: false, // [ 'discord' ] if set to an array or a string, the bot will send a discord message to the specified channel(s)
                enabled: false, // if set to true, bot will routinely poll OnAir for the current VA details
                cron: '0 * * * *', // will run cron task every 1 hour,
                autoDelete: true, // if set to true, bo will automatically delete the refresh complete notification after the autoDeleteInterval (milliseconds)
                autoDeleteInterval: 10000, // time in milliseconds to wait before deleting the refresh complete notification
            },
            VAJobs: {
                notify: false, // [ 'discord' ] if set to an array or a string, the bot will send a discord message to the specified channel(s)
                enabled: false, // if set to true, bot will routinely poll OnAir for the latest VA Jobs status
                cron: '*/15 * * * *',  // will run cron task every 15 minutes,
                autoDelete: true, // if set to true, bo will automatically delete the refresh complete notification after the autoDeleteInterval (milliseconds)
                autoDeleteInterval: 10000, // time in milliseconds to wait before deleting the refresh complete notification
            },
            VAFleet: {
                notify: false, // [ 'discord' ] if set to an array or a string, the bot will send a discord message to the specified channel(s)
                enabled: false, // if set to true, bot will routinely poll OnAir for the current VA fleet status
                cron: '*/5 * * * *',  // will run cron task every 30 minutes,
                autoDelete: true, // if set to true, bo will automatically delete the refresh complete notification after the autoDeleteInterval (milliseconds)
                autoDeleteInterval: 10000, // time in milliseconds to wait before deleting the refresh complete notification
            },
            VAMembers: {
                notify: false, // [ 'discord' ] if set to an array or a string, the bot will send a discord message to the specified channel(s)
                enabled: false, // if set to true, bot will routinely poll OnAir for the current VA fleet status
                cron: '*/30 * * * *',  // will run cron task every 30 minutes,
                autoDelete: true, // if set to true, bo will automatically delete the refresh complete notification after the autoDeleteInterval (milliseconds)
                autoDeleteInterval: 10000, // time in milliseconds to wait before deleting the refresh complete notification
            },
            VANotifications: {
                notify: false, // [ 'discord' ] if set to an array or a string, the bot will send a discord message to the specified channel(s)
                enabled: false, // if set to true, bot will routinely poll OnAir for the current VA Notifications
                cron: '*/5 * * * *',  // will run cron task every minute,
                autoDelete: true, // if set to true, bo will automatically delete the refresh complete notification after the autoDeleteInterval (milliseconds)
                autoDeleteInterval: 10000, // time in milliseconds to wait before deleting the refresh complete notification
            },
        },
        sorting: {
            Members: ['role', 'company', 'latest', 'flights', 'hours', 'rep'],
            Flights: [],
            Jobs: [],
        },
        refreshOnStartup: false, // if set to true, bot will run all enabled refresh tasks at startup
        loadOnStartup: false, // if set to true, bot will run all enabled model tasks from the database at startup
    },
    log: {
        logLevel: 'info',
        logToConsole: true,
    },
    // required for OnAir Event polling
    // redis: {
    //     host: 'localhost',
    //     port: 6379,
    //     db: 0,
    // }
};

export default config;
