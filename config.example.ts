import { GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { BotConfig } from './types';
dotenv.config();

const {
    DISCORD_TOKEN,
    DISCORD_CLIENTID,
    DISCORD_GUILDID,
    DISCORD_OWNERID,
    DISCORD_CHANNELID,
    DISCORD_FLEET_STATUS_CHANNELID,
    ONAIR_COMPANYID,
    ONAIR_VAID,
    ONAIR_APIKEY,
} = process.env;


if (!DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is not set in .env');
if (!DISCORD_CLIENTID) throw new Error('DISCORD_CLIENTID is not set in .env');
if (!DISCORD_GUILDID) throw new Error('DISCORD_GUILDID is not set in .env');
if (!DISCORD_OWNERID) throw new Error('DISCORD_OWNERID is not set in .env');
if (!DISCORD_CHANNELID) throw new Error('DISCORD_CHANNELID is not set in .env');
if (!DISCORD_FLEET_STATUS_CHANNELID) throw new Error('DISCORD_FLEET_STATUS_CHANNELID is not set in .env');
if (!ONAIR_COMPANYID) throw new Error('ONAIR_COMPANYID is not set in .env');
if (!ONAIR_VAID) throw new Error('ONAIR_VAID is not set in .env');
if (!ONAIR_APIKEY) throw new Error('ONAIR_APIKEY is not set in .env');

const config:BotConfig = {
    discord: {
        enabled: true, // set to false to disable the discord bot
        token: DISCORD_TOKEN, // obtain from https://discord.com/developers/applications
        clientId: DISCORD_CLIENTID, // also known as Application ID, obtain from https://discord.com/developers/applications
        guildId: DISCORD_GUILDID,  // also known as Server ID, obtain in Discord server, right click server icon, click copy Server ID
        deployCommands: true, // whether or not to deploy the slash commands at startup, this will refresh the commands if changed, ok to leave to true
        onConnectNotice: true, // if set to true, bot will send a message to the channel specified in the 'OnConnectNoticeChannel' setting when it connects to Discord
        onConnectNoticeAutoDelete: true, // if set to true, bot will automatically delete the OnConnectNotice message after ${onConnectNoticeAutoDeleteAfter} milliseconds
        onConnectNoticeAutoDeleteAfter: 10000, // time in milliseconds to wait before deleting the OnConnectNotice message
        intents: [
            GatewayIntentBits.Guilds, // no need to change unless you want to restrict bot's usage more
        ],
        owners: [
            DISCORD_OWNERID, // discord server owner User ID
        ],
        channels: {
            'OnConnectNoticeChannel': DISCORD_CHANNELID, // The channel to send OnConnectNotice event messages to
            'onair-notifications': DISCORD_CHANNELID, // The channel to send onair VA notification messages to
            'fleet-status': DISCORD_FLEET_STATUS_CHANNELID, // The channel to send fleet status messages to
        },
        roles: undefined, // if you want to restrict bot's slash command usage to specific roles, add the role IDs here, otherwise leave undefined
        // roles: {
        //     member: '###_DISCORD_ROLE_ID_###',
        //     owner: '###_DISCORD_ROLE_ID_###',
        // }
    },
    onair: {
        enabled: true,
        status: {
            fleet: {
                enabled: true,
                interval: 60000, // time in milliseconds to wait before checking fleet status again
                channelId: DISCORD_FLEET_STATUS_CHANNELID, // The channel to send fleet status messages to
            },
        },
        keys: {
            companyId: ONAIR_COMPANYID, // obtain from the OnAir Company app, see wiki https://github.com/VAMSApp/OnAirDiscordBot/wiki/How-to-obtain-CompanyID,-VirtualAirlineID,-ApiKey-from-OnAir
            vaId: ONAIR_VAID, // obtain from the OnAir Company app, see wiki https://github.com/VAMSApp/OnAirDiscordBot/wiki/How-to-obtain-CompanyID,-VirtualAirlineID,-ApiKey-from-OnAir
            apiKey: ONAIR_APIKEY, // obtain from the OnAir Company app, see wiki https://github.com/VAMSApp/OnAirDiscordBot/wiki/How-to-obtain-CompanyID,-VirtualAirlineID,-ApiKey-from-OnAir
        },
        sorting: {
            Members: ['role', 'company', 'latest', 'flights', 'hours', 'rep'], // columns in results that are able to be sorted by
            Flights: [],
            Jobs: [],
        }
    },
    log: {
        logLevel: 'info',
        logToConsole: true,
    },
};

export default config;
