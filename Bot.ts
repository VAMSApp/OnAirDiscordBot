/**
 * Bot.ts
 * Primary Class for interacting with Discord
 * @author Mike DeVita <mike@devita.co>
 */
import * as dotenv from 'dotenv'
dotenv.config()
import Logger from './utils/Logger'
import { BotConfig, Command, OnAirEvent, OnAirEventConfig, OnAirEventsConfig, OnAirPollingConfig, OnAirPollingsConfig, Schedule, } from './types'
import { IBot, ILogger, IOnAir, IOnAirEvent } from './interfaces'
import OnAir from './OnAir'
import { Client, ClientApplication, Channel, Message, Collection, REST, Routes, } from 'discord.js'
import { OnReadyMessage } from './messages'
import { readdirSync } from 'fs'
import path from 'path'
import BaseRepo from './repos/BaseRepo'
import cron from 'node-cron'
import cronstrue from 'cronstrue'
import { EventService, IEventService } from './utils'

class Bot implements IBot {
    private AppToken:string;
    private ClientId:string;
    private GuildId:string;
    public commands: Collection<string, Command>;

    public log: ILogger;
    public config: BotConfig;
    public OnAir: IOnAir;
    public client: Client;
    public EventHandler: IEventService;

    constructor(config:BotConfig) {    
        if (!config) throw new Error('No config provided, exiting.');
        this.config = config
        
        if (!this.config.onair) throw new Error('No OnAir config provided, exiting.');
        if (!this.config.discord) throw new Error('No Discord config provided, exiting.');
        this.AppToken = this.config.discord.token;
        this.ClientId = this.config.discord.clientId;
        this.GuildId = this.config.discord.guildId;

        this.log = new Logger(this.config.log);
        new BaseRepo().init(this);

        this.OnAir = new OnAir(this.config.onair, this as IBot);
        this.EventHandler = new EventService(this.config.redis, this as IBot);

        this.client = new Client({
            intents: [
                this.config.discord.intents
            ]
        })

        this.commands = new Collection();

        this.log.info('Initializing Discord Client');

        this.loadCommands();
        this.deployCommands();
        this.login();
        this.onReady();
        this.loadEvents();
        this.loadSchedules();
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
        return new Promise(async (resolve, reject) => {
            if (!this.config.discord) {
                throw new Error('No Discord config provided, exiting.');
            }
            
            const commands = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith(".ts"));
            this.log.info(`Loading ${commands.length} commands`);

            for (const file of commands) {
                // load the command file from the 'commands' folder
                const command = require(path.join(__dirname, 'commands', file)).default;

                const {
                    name, // pull the command name from the data object
                } = command.data

                // if the name exists
                if (name) {
                    // log that we're loading the command 'name'
                    // set the command in the collection
                    this.log.info(`✅ Loading Command: ${name}`);
                    this.commands.set(name, command);
                // otherwise
                } else {
                    // just continue along...
                    this.log.info(`❌ Skipping Command: ${name}`);
                    continue;
                }
            }

            this.client.on('interactionCreate', async (interaction:any) => {
                if (!interaction.isChatInputCommand()) return;
            
                const command = this.commands.get(interaction.commandName);
            
                if (!command) return;
            
                try {
                    await command.execute(interaction, this as IBot);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command! Please let Mike the Bot administrator know ASAP so that a fix can occur!\n', ephemeral: true });
                }
            })

            this.log.info(`✅ Loaded ${commands.length} slash commands`)
        })
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
        const commands = [];
        const commandFiles = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith(".ts"));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`).default;
            if (!command) continue;

            commands.push(command.data.toJSON());
            this.log.info(`Will deploy slash command: /${command.data.name}`)
        }
        
        const rest = new REST({ version: '10' }).setToken(this.AppToken);
        

        try {
            this.log.debug('Started reloading slash commands.');
    
            await rest.put(
                Routes.applicationGuildCommands(this.ClientId, this.GuildId),
                { body: commands },
            );
    
            this.log.info('✅ Reloaded slash commands.');
        } catch (error:any) {
            this.log.error(error);
        }
    }

    /**
     * login()
     * Logs the bot into the Discord server
     * 
     * @returns Promise<void>
     */
    login(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.log.debug('Logging into the discord server')
            this.client.login(this.AppToken)
            return resolve();
        })
    }

    /**
     * getChannelId()
     * Gets the channel ID from the config file
     * 
     * by a given channel name.
     * @param channelName string | The name of the channel to get the ID for
     * @returns string
     */
    getChannelId(channelName:string):string {
        if (!this.config.discord) {
            throw new Error('No Discord config provided, exiting.');
        }

        const channelId:string = this.config.discord.channels[channelName];
        return channelId
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
            const discordServerName = client.guilds.cache.map(g => g.name).join('\n')

            this.log.info(`Logged into the ${discordServerName} discord server as ${client?.user?.tag}`);
            
            if (!this.config.discord) {
                throw new Error('No Discord config provided, exiting.');
            }

            if (this.config.discord.onConnectNotice === true) {
                const readyMsg:string = OnReadyMessage()
                const onConnectNoticeChannelId:string = this.getChannelId('OnConnectNoticeChannel')

                client
                .channels
                .fetch(onConnectNoticeChannelId)
                .then((channel:any):void => {
                    if (channel === null) {
                        this.log.error(`Unable to find channel with id ${onConnectNoticeChannelId}`);
                        return;
                    }

                    channel.send(readyMsg)
                })
                .catch((err:any) => {
                    this.log.error(`Error sending OnConnectNotice: ${err}`);
                })
            }
        });
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

        const roleId:string = this.config.discord.roles[roleName];
        return roleId
    }

    /**
     * loadEvents()
     * Loads all events from the events folder
     * 
     * @returns void
     * @throws Error
     * @todo Add sub-folder handling so events can be split up into sub-folders
     */
    loadEvents(): void {
        const self = this;
        const {
            events
        } = self.config.onair;

        const enabledEventKeys = Object.keys(events).filter((k:any) => {
            const key = k as keyof typeof events;
            const enabled:boolean = events[key].enabled;

            return (enabled === true)
        });

        if (enabledEventKeys.length === 0 || !enabledEventKeys) return;

        // read all files in the 'events' directory
        const _events = readdirSync(path.join(__dirname, 'events')).filter(file => {
            const isEnabled = enabledEventKeys.includes(file.split('.')[0]);
            return (isEnabled) ? file : false;
        });

        if (_events.length === 0 || !_events) {
            this.log.debug(`No events found in the 'events' directory`);
            return; 
        }

        // loop through all of the events and load them
        for (const file of _events) {
            const event:IOnAirEvent = require(path.join(__dirname, 'events', file)).default;
            if (!event) continue;

            const name = event.name as keyof OnAirEventsConfig;
            
            self.EventHandler.subscribe(name, (data:OnAirEvent) => {
                self.log.debug(`Event triggered: ${name}`);
                event.execute(name, data, self as IBot);
                self.log.info(`✅ Executed event: ${name} (${file})`);
            });
        }

        self.log.info(`✅ Subscribed to ${enabledEventKeys.length} Events`);

    }

    /**
     * loadSchedules()
     * Loads all schedules from the schedules folder
     * 
     * @returns void
     * @throws Error
     * @todo Add sub-folder handling so schedules can be split up into sub-folders
     */
    loadSchedules(): void {
        const self = this;
        const {
            polling
        } = self.config.onair;

        const enabledScheduleKeys = Object.keys(polling).filter((k:any) => {
            const key = k as keyof typeof polling;
            return (polling[key].enabled === true)
        });

        if (enabledScheduleKeys.length === 0 || !enabledScheduleKeys) return;

        // read all files in the 'schedules' directory
        const schedules = readdirSync(path.join(__dirname, 'schedules')).filter(file => {
            const isEnabled = enabledScheduleKeys.includes(file.split('.')[0]);
            return (isEnabled) ? file : false;
        });

        if (schedules.length === 0 || !schedules) {
            this.log.debug(`No schedules found in the 'schedules' directory`);
            return; 
        }

        // loop through all of the schedules and load them
        for (const file of schedules) {
            const schedule:Schedule = require(path.join(__dirname, 'schedules', file)).default;
            if (!schedule) continue;
            const taskName:string = file.split('.')[0];
            const name = taskName as keyof OnAirPollingsConfig;
            const pollCfg:OnAirPollingConfig = polling[name]; // the schedule config
            if (!pollCfg || !pollCfg.cron) continue;

            if (!cron.validate(pollCfg.cron)) {
                this.log.error(`⚠️ Invalid cron expression for '${file}'`);
                continue;
            }

            cron.schedule(pollCfg.cron, () => schedule.execute(self), pollCfg.opts);
            this.log.info(`✅ Schedule::${taskName} - Will ${schedule.description} ${cronstrue.toString(pollCfg.cron).toLowerCase()}`);
        }

        this.log.info(`✅ Scheduled ${enabledScheduleKeys.length} Tasks`);
    }
}

export default Bot;
