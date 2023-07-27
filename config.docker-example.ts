import { GatewayIntentBits } from 'discord.js';
import { BotConfig } from './types';
import * as dotenv from 'dotenv';
dotenv.config();

const {
    DISCORD_TOKEN,
    DISCORD_CLIENTID,
    DISCORD_GUILDID,
    DISCORD_OWNER,
    DISCORD_CHANNEL,
    DISCORD_DEPLOYCOMMANDS,
    DISCORD_ONCONNECTNOTICE,
    ONAIR_COMPANYID,
    ONAIR_VAID,
    ONAIR_APIKEY,
    LOGLEVEL,
} = process.env;

if (!DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is required in .env');
if (!DISCORD_CLIENTID) throw new Error('DISCORD_CLIENTID is required in .env');
if (!DISCORD_GUILDID) throw new Error('DISCORD_GUILDID is required in .env');
if (!DISCORD_OWNER) throw new Error('DISCORD_OWNER is required in .env');
if (!DISCORD_CHANNEL) throw new Error('DISCORD_CHANNEL is required in .env');
if (!ONAIR_COMPANYID) throw new Error('ONAIR_COMPANYID is required in .env');
if (!ONAIR_VAID) throw new Error('ONAIR_VAID is required in .env');
if (!ONAIR_APIKEY) throw new Error('ONAIR_APIKEY is required in .env');

const config:BotConfig = {
    discord: {
        enabled: true,
        token: DISCORD_TOKEN,
        clientId: DISCORD_CLIENTID,
        guildId: DISCORD_GUILDID,
        deployCommands: (DISCORD_DEPLOYCOMMANDS === 'true') || true,
        onConnectNotice: (DISCORD_ONCONNECTNOTICE === 'true') || true, // if set to true, bot will send a message to the channel specified in the 'OnConnectNoticeChannel' setting when it connects to Discord
        onConnectNoticeAutoDelete: true, // if set to true, bot will automatically delete the OnConnectNotice message after ${onConnectNoticeAutoDeleteAfter} milliseconds
        onConnectNoticeAutoDeleteAfter: 10000, // time in milliseconds to wait before deleting the OnConnectNotice message
        intents: [
            GatewayIntentBits.Guilds,
        ],
        roles: undefined,
        owners: [
            DISCORD_OWNER,
        ],
        channels: {
            'discord': DISCORD_CHANNEL, // The channel to send discord event messages to
            'OnConnectNoticeChannel': DISCORD_CHANNEL, // The channel to send OnConnectNotice event messages to
            'onair-notifications': DISCORD_CHANNEL, // The channel to send onair VA notification messages to
        },
        
    },
    onair: {
        enabled: true,
        keys: {
            companyId: ONAIR_COMPANYID,
            vaId: ONAIR_VAID,
            apiKey: ONAIR_APIKEY,
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
        logLevel: LOGLEVEL || 'info',
        logToConsole: true,
    },
};

export default config;
