/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * Bot.ts
 * Primary Class for interacting with Discord
 * @author Mike DeVita <mike@devita.co>
 */
import * as dotenv from 'dotenv';
dotenv.config();
import Logger from '@/utils/Logger';
import { BotConfig, Command, SlashCommand, } from '@/types';
import { IBot, ILogger, IOnAir } from '@/interfaces';
import OnAir from '@/OnAir';
import { Channel, Client, Collection, Interaction, Message, REST, Routes, TextChannel, } from 'discord.js';
import { FleetList, FlightsList, OnReadyMessage } from '@/messages';
import { readdirSync } from 'fs';
import path from 'path';
import { eachSeries } from 'async';
import { Flight as OnAirFlight, Aircraft as OnAirAircraft } from 'onair-api';

class Bot implements IBot {
    private AppToken:string;
    private ClientId:string;
    private GuildId:string;
    public commands: Collection<string, Command>;

    public log: ILogger;
    public config: BotConfig;
    public OnAir: IOnAir;
    public client: Client;

    constructor(config:BotConfig) {    
        if (!config) throw new Error('No config provided, exiting.');
        this.config = config;
        
        if (!this.config.onair) throw new Error('No OnAir config provided, exiting.');
        if (!this.config.discord) throw new Error('No Discord config provided, exiting.');
        this.AppToken = this.config.discord.token;
        this.ClientId = this.config.discord.clientId;
        this.GuildId = this.config.discord.guildId;

        this.log = new Logger(this.config.log);

        this.OnAir = new OnAir(this.config.onair, this as IBot);
        this.client = new Client({
            intents: [
                this.config.discord.intents
            ]
        });

        this.commands = new Collection();

        this.log.info('Initializing Discord Client');

        this.loadCommands();
        this.deployCommands();
        this.login();
        this.onReady();
        this.getRoleId = this.getRoleId.bind(this);
    }
    
    /**
     * loadCommands()
     * Loads all commands from the commands folder
     * 
     * @returns Promise<void>
     * @throws Error
     * @todo Add sub-folder handling so commands can be split up into sub-folders
     */
    loadCommands(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.config.discord) {
                return reject(new Error('No Discord config provided, exiting.'));
            }
            
            const commands = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.ts'));
            this.log.info(`Loading ${commands.length} commands`);
            
            // copilot: using async eachSeries, loop through each file in the commands folder and load it
            eachSeries(commands, (file, cb) => {
                // load the command file from the 'commands' folder
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const command = require(path.join(__dirname, 'commands', file)).default;
                if (!command) return cb(new Error(`No command found in ${file}`));

                const {
                    name, // pull the command name from the data object
                } = command.data;

                // if the name exists
                if (name) {
                    // log that we're loading the command 'name'
                    // set the command in the collection
                    this.log.debug(`✅ Loading Command: ${name}`);
                    this.commands.set(name, command);
                    return cb();
                // otherwise
                } else {
                    // just continue along...
                    this.log.debug(`❌ Skipping Command: ${name}`);
                    return cb();
                }
            }, (err) => {
                // if there's an error, reject the promise
                if (err) {
                    return reject(err);
                }
                // otherwise, resolve the promise
                
                return resolve();
            });

            this.client.on('interactionCreate', async (interaction:Interaction) => {
                if (!interaction.isChatInputCommand()) return;
            
                const command = this.commands.get(interaction.commandName);

                if (!command) return;
                this.log.debug(`${interaction.member?.user.username} is Executing command: ${command.data.name}`);
            
                try {
                    await command.execute(interaction, this as IBot);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command! Please let Mike the Bot administrator know ASAP so that a fix can occur!\n', ephemeral: true });
                }
            });

            this.log.info(`✅ Loaded ${commands.length} slash commands`);
        });
    }

    /**
     * deployCommands()
     * Deploys all commands from the commands folder to the Discord server
     * 
     * @returns Promise<void>
     * @throws Error
     * @todo Add sub-folder handling so commands can be split up into sub-folders
     */
    async deployCommands(): Promise<void> {
        const commands:SlashCommand[] = [];
        const commandFiles:string[] = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.ts'));

        eachSeries(commandFiles, (file, cb) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command = require(`./commands/${file}`).default;
            if (!command) return cb();

            this.log.debug(`Deploying slash command: /${command.data.name}`);
            commands.push(command.data.toJSON());
            return cb();
        }, async (err) => {
            // if there's an error, reject the promise
            if (err) {
                return err;
            }

            const rest = new REST({ version: '10' }).setToken(this.AppToken);
        

            try {
                this.log.debug('Started reloading slash commands.');
        
                await rest.put(
                    Routes.applicationGuildCommands(this.ClientId, this.GuildId),
                    { body: commands },
                );
        
                this.log.info('✅ Reloaded slash commands.');
            } catch (error:unknown) {
                if (error instanceof Error) {
                    const msg = error.message as string;
                    this.log.error(msg);
                } else {
                    this.log.error('Unknown error occurred while reloading slash commands.');
                }
            }
        });
    }

    /**
     * login()
     * Logs the bot into the Discord server
     * 
     * @returns Promise<void>
     */
    login(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.log.debug('Logging into the discord server');
            if (!this.config.discord) {
                return reject(new Error('No Discord config provided, exiting.'));
            }

            this.client.login(this.AppToken);
            return resolve();
        });
    }

    /**
     * onReady()
     * Handles the onReady event for the Discord client
     * 
     * @returns void
     * @throws Error
     */
    onReady(): void {
        if (!this.config.discord) {
            throw new Error('No Discord config provided, exiting.');
        }

        
        this.client.on('ready', async (client:Client) => {
            const discordServerName = client.guilds.cache.map(g => g.name).join('\n');
            const username = client.user?.username || 'OnAirTrackerBot';

            this.log.info(`Logged into the ${discordServerName} discord server as ${username}`);
            
            if (!this.config.discord) {
                throw new Error('No Discord config provided, exiting.');
            }

            this.OnAir.loadVAStatusChannels();

            if (this.config.discord.onConnectNotice === true) {
                this.sendOnConnectNotice();
            }

            return;
        });
    }

    async sendOnConnectNotice(): Promise<void> {
        const readyMsg:string = OnReadyMessage(this.client.user?.username || 'OnAirTrackerBot');

        const onConnectNoticeChannelId:string|undefined = this.config.discord.onConnectNoticeChannelId;
        if (!onConnectNoticeChannelId) {
            this.log.error('No channel ID provided for onConnectNotice, exiting.');
            return;
        }

        const channel: TextChannel|null = await this.getChannel(onConnectNoticeChannelId) as TextChannel|null;
        
        if (channel === null) {
            this.log.error(`Unable to find channel with id ${onConnectNoticeChannelId}`);
            return;
        }
        
        const onConnectNoticeAutoDelete:boolean = this.config.discord.onConnectNoticeAutoDelete;
        const onConnectNoticeAutoDeleteAfter:number = this.config.discord.onConnectNoticeAutoDeleteAfter || 10000;

        this.log.info(`Sending onConnectNotice to channel ${channel.name} (${channel.id}).`);
        const msg:Message = await channel.send(readyMsg);

        if (onConnectNoticeAutoDelete) {
            this.log.info(`Will auto delete the onConnectNotice message after ${onConnectNoticeAutoDeleteAfter}ms.`);
            setTimeout(() => {
                msg.delete();
                this.log.info(`Deleted onConnectNotice message after ${onConnectNoticeAutoDeleteAfter}ms.`);
            }, onConnectNoticeAutoDeleteAfter);
        }
        return;
    }
    
    getChannel(channelId:string): Promise<Channel|null> {
        const channel: Promise<Channel | null> = this.client.channels.fetch(channelId);

        if (!channel) {
            this.log.error(`Unable to find channel with id ${channelId}`);
            return Promise.reject(null);
        }

        return Promise.resolve(channel);
    }

    /**
     * getRoleId()
     * Gets the role ID from the config file
     * 
     * by a given role name.
     * @param roleName string | The name of the role to get the ID for
     * @returns string
     * @throws Error
     */
    getRoleId(roleName:string):string {
        if (!this.config.discord) {
            throw new Error('No Discord config provided, exiting.');
        }
        
        if (!this.config.discord.roles) {
            return '';
        } else {
            const roleId:string = this.config.discord.roles[roleName];
            return roleId;
        }

    }
}

export default Bot;
