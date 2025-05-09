import { GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { BotConfig } from './types';
dotenv.config();

const {
    DISCORD_TOKEN,
    DISCORD_CLIENTID,
    DISCORD_GUILDID,
    DISCORD_OWNERID,
    DISCORD_ONCONNECT_NOTICE_CHANNELID,
    DISCORD_ONCONNECT_NOTICE_ENABLED,
    DISCORD_ONCONNECT_NOTICE_AUTODELETE,
    DISCORD_ONCONNECT_NOTICE_AUTODELETE_DELAY_MS,
    DISCORD_FLEET_STATUS_ENABLED, 
    DISCORD_FLEET_STATUS_CHANNELID,
    DISCORD_FLEET_STATUS_INTERVAL, // time in seconds to wait before checking fleet status again, defaults to every 60 seconds
    DISCORD_FLEET_STATUS_SORTCOLUMN,
    DISCORD_FLEET_STATUS_PAGESIZE, // number of messages per page
    DISCORD_FLIGHTS_STATUS_CHANNELID,
    DISCORD_FLIGHTS_STATUS_ENABLED,
    DISCORD_FLIGHTS_STATUS_INTERVAL,
    DISCORD_FLIGHTS_STATUS_SORTCOLUMN,
    DISCORD_FLIGHTS_STATUS_PAGESIZE,
    DISCORD_FBOS_STATUS_ENABLED,
    DISCORD_FBOS_STATUS_CHANNELID,
    DISCORD_FBOS_STATUS_INTERVAL,
    DISCORD_FBOS_STATUS_SORTCOLUMN,
    DISCORD_FBOS_STATUS_PAGESIZE,
    DISCORD_MEMBERS_STATUS_ENABLED,
    DISCORD_MEMBERS_STATUS_CHANNELID,
    DISCORD_MEMBERS_STATUS_INTERVAL,
    DISCORD_MEMBERS_STATUS_SORTCOLUMN,
    DISCORD_MEMBERS_STATUS_PAGESIZE,
    ONAIR_COMPANYID,
    ONAIR_VAID,
    ONAIR_APIKEY,
} = process.env;


if (!DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is not set in .env');
if (!DISCORD_CLIENTID) throw new Error('DISCORD_CLIENTID is not set in .env');
if (!DISCORD_GUILDID) throw new Error('DISCORD_GUILDID is not set in .env');
if (!DISCORD_OWNERID) throw new Error('DISCORD_OWNERID is not set in .env');
if (!DISCORD_ONCONNECT_NOTICE_CHANNELID) throw new Error('DISCORD_ONCONNECT_NOTICE_CHANNELID is not set in .env');
if (!DISCORD_FLEET_STATUS_CHANNELID) throw new Error('DISCORD_FLEET_STATUS_CHANNELID is not set in .env');
if (!DISCORD_FLIGHTS_STATUS_CHANNELID) throw new Error('DISCORD_FLIGHTS_STATUS_CHANNELID is not set in .env');
if (!DISCORD_FBOS_STATUS_CHANNELID) throw new Error('DISCORD_FBOS_STATUS_CHANNELID is not set in .env');
if (!DISCORD_MEMBERS_STATUS_CHANNELID) throw new Error('DISCORD_MEMBERS_STATUS_CHANNELID is not set in .env');
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
        onConnectNotice: (DISCORD_ONCONNECT_NOTICE_ENABLED == 'true'), // if set to true, bot will send a message to the channel specified in the 'OnConnectNoticeChannel' setting when it connects to Discord
        onConnectNoticeAutoDelete: (DISCORD_ONCONNECT_NOTICE_AUTODELETE == 'true'), // if set to true, bot will automatically delete the OnConnectNotice message after ${onConnectNoticeAutoDeleteAfter} milliseconds
        onConnectNoticeAutoDeleteAfter: (DISCORD_ONCONNECT_NOTICE_AUTODELETE_DELAY_MS) ? parseInt(DISCORD_ONCONNECT_NOTICE_AUTODELETE_DELAY_MS) : 10000, // time in milliseconds to wait before deleting the OnConnectNotice message
        onConnectNoticeChannelId: DISCORD_ONCONNECT_NOTICE_CHANNELID, // channel to send the OnConnectNotice message to
        intents: [
            GatewayIntentBits.Guilds, // no need to change unless you want to restrict bot's usage more
        ],
        owner: DISCORD_OWNERID,
        roles: undefined, // set to undefined by default role checking is disabled.
    },
    onair: {
        enabled: true,
        status: {
            fleet: {
                enabled: (DISCORD_FLEET_STATUS_ENABLED === 'true'), // set to true to enable refresh, false to disable
                interval: (DISCORD_FLEET_STATUS_INTERVAL) ? parseInt(DISCORD_FLEET_STATUS_INTERVAL) : 10, // time in seconds to wait before refreshing again, defaults to every 60 seconds
                channelId: DISCORD_FLEET_STATUS_CHANNELID,
                sortColumn: DISCORD_FLEET_STATUS_SORTCOLUMN,
                pageSize: (DISCORD_FLEET_STATUS_PAGESIZE) ? parseInt(DISCORD_FLEET_STATUS_PAGESIZE) : 10,
            },
            flights: {
                enabled: (DISCORD_FLIGHTS_STATUS_ENABLED === 'true'), // set to true to enable refresh, false to disable
                interval: (DISCORD_FLIGHTS_STATUS_INTERVAL) ? parseInt(DISCORD_FLIGHTS_STATUS_INTERVAL) : 10, // time in seconds to wait before refreshing again, defaults to every 60 seconds
                channelId: DISCORD_FLIGHTS_STATUS_CHANNELID,
                sortColumn: DISCORD_FLIGHTS_STATUS_SORTCOLUMN,
                pageSize: (DISCORD_FLIGHTS_STATUS_PAGESIZE) ? parseInt(DISCORD_FLIGHTS_STATUS_PAGESIZE) : 10,
            },
            fbos: {
                enabled: (DISCORD_FBOS_STATUS_ENABLED === 'true'), // set to true to enable refresh, false to disable
                interval: (DISCORD_FBOS_STATUS_INTERVAL) ? parseInt(DISCORD_FBOS_STATUS_INTERVAL) : 10, // time in seconds to wait before refreshing again, defaults to every 60 seconds
                channelId: DISCORD_FBOS_STATUS_CHANNELID,
                sortColumn: DISCORD_FBOS_STATUS_SORTCOLUMN,
                pageSize: (DISCORD_FBOS_STATUS_PAGESIZE) ? parseInt(DISCORD_FBOS_STATUS_PAGESIZE) : 10,
            },
            members: {
                enabled: (DISCORD_MEMBERS_STATUS_ENABLED === 'true'), // set to true to enable refresh, false to disable
                interval: (DISCORD_MEMBERS_STATUS_INTERVAL) ? parseInt(DISCORD_MEMBERS_STATUS_INTERVAL) : 10, // time in seconds to wait before refreshing again, defaults to every 60 seconds
                channelId: DISCORD_MEMBERS_STATUS_CHANNELID,
                sortColumn: DISCORD_MEMBERS_STATUS_SORTCOLUMN,
                pageSize: (DISCORD_MEMBERS_STATUS_PAGESIZE) ? parseInt(DISCORD_MEMBERS_STATUS_PAGESIZE) : 10,
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
