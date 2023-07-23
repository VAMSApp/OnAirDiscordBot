import { GatewayIntentBits } from 'discord.js';
import { BotConfig } from './types';

const config:BotConfig = {
    discord: {
        enabled: true, // set to false to disable the discord bot
        token: '###_DISCORD_TOKEN_###', // obtain from https://discord.com/developers/applications
        clientId: '###_DISCORD_CLIENTID_###', // also known as Application ID, obtain from https://discord.com/developers/applications
        guildId: '###_DISCORD_GUILDID_###',  // also known as Server ID, obtain in Discord server, right click server icon, click copy Server ID
        deployCommands: true, // whether or not to deploy the slash commands at startup, this will refresh the commands if changed, ok to leave to true
        onConnectNotice: false, // if set to true, bot will send a message to the channel specified in the 'OnConnectNoticeChannel' setting when it connects to Discord
        onConnectNoticeAutoDelete: true, // if set to true, bot will automatically delete the OnConnectNotice message after ${onConnectNoticeAutoDeleteAfter} milliseconds
        onConnectNoticeAutoDeleteAfter: 10000, // time in milliseconds to wait before deleting the OnConnectNotice message
        intents: [
            GatewayIntentBits.Guilds, // no need to change unless you want to restrict bot's useage more
        ],
        owners: [
            '###_DISCORD_OWNERID_###', // discord server owner User ID
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
        roles: undefined, // if you want to restrict bot's slash command useage to specific roles, add the role IDs here, otherwise leave undefined
        // roles: {
        //     member: '###_DISCORD_ROLE_ID_###',
        //     owner: '###_DISCORD_ROLE_ID_###',
        // }
    },
    onair: {
        enabled: true,
        keys: {
            companyId: '###_ONAIR_COMPANYID_###', // obtain from the OnAir Company app, see wiki https://github.com/VAMSApp/OnAirDiscordBot/wiki/How-to-obtain-CompanyID,-VirtualAirlineID,-ApiKey-from-OnAir
            vaId: '###_ONAIR_VAID_###', // obtain from the OnAir Company app, see wiki https://github.com/VAMSApp/OnAirDiscordBot/wiki/How-to-obtain-CompanyID,-VirtualAirlineID,-ApiKey-from-OnAir
            apiKey: '###_ONAIR_APIKEY_###', // obtain from the OnAir Company app, see wiki https://github.com/VAMSApp/OnAirDiscordBot/wiki/How-to-obtain-CompanyID,-VirtualAirlineID,-ApiKey-from-OnAir
        },
        sorting: {
            Members: ['role', 'company', 'latest', 'flights', 'hours', 'rep'], // columns in results that are able to be sorted by
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
};

export default config;
