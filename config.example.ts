import { GatewayIntentBits } from 'discord.js'
import { Guid } from 'onair-api/dist/types/Guid';
import { BotConfig } from './types';

const config:BotConfig = {
    discord: {
        enabled: true,
        token: '###_DISCORD_BOT_TOKEN_###',
        clientId: '###_DISCORD_CLIENT_ID_###',
        guildId: '###_DISCORD_GUILD_ID_###',
        deployCommands: false,
        onConnectNotice: true, // if set to true, bot will send a message to the channel specified in the 'OnConnectNoticeChannel' setting when it connects to Discord
        onConnectNoticeAutoDelete: true, // if set to true, bot will automatically delete the OnConnectNotice message after ${onConnectNoticeAutoDeleteAfter} milliseconds
        onConnectNoticeAutoDeleteAfter: 10000, // time in milliseconds to wait before deleting the OnConnectNotice message
        intents: [
            GatewayIntentBits.Guilds,
        ],
        owners: [
            '###_ENTER_DISCORD_OWNERIDS_HERE_###',
            '###_ENTER_DISCORD_OWNERIDS_HERE_###',
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
            companyId: new string('###_ONAIR_COMPANY_ID_###'),
            vaId: new string('###_ONAIR_VA_ID_###'),
            apiKey: new string('###_ONAIR_APIKEY_ID_###'),
        },
        events: {
            VADetails: {
                autoDelete: true,
                autoDeleteAfter: 10000,
            },
            VAFleet: {
                autoDelete: true,
                autoDeleteAfter: 10000,
            },
            VAJobs: {
                autoDelete: true,
                autoDeleteAfter: 10000,
            },
            VANotifications: {
                autoDelete: true,
                autoDeleteAfter: 10000,
            },
        },
        polling: {
            VADetails: {
                enabled: false, // if set to true, bot will routinely poll OnAir for the current VA details
                cron: '*/15 * * * *', // will run cron task every 15 minutes,
            },
            VAJobs: {
                enabled: false, // if set to true, bot will routinely poll OnAir for the latest VA Jobs status
                cron: '*/5 * * * *',  // will run cron task every 5 minutes,
            },
            VAFleet: {
                enabled: false, // if set to true, bot will routinely poll OnAir for the current VA fleet status
                cron: '*/5 * * * *',  // will run cron task every 5 minutes,
            },
            VANotifications: {
                enabled: true, // if set to true, bot will routinely poll OnAir for the current VA Notifications
                cron: '*/2 * * * *',  // will run cron task every 2 minutes,
            },
        },
        sorting: {
            Members: ['role', 'company', 'latest', 'flights', 'hours', 'rep'],
            Flights: false,
            Jobs: false,
        },
        refreshOnStartup: true, // if set to true, bot will run all enabled refresh tasks at startup
    },
    log: {
        level: 'debug',
        logToConsole: true,
    },
    redis: {
        host: 'localhost', // redis host
        port: 6379, // redis port
        db: "###_REDIS_DB_###",
        password: "###_REDIS_PASSWORD_###",
    },
}

export default config
