import * as dotenv from 'dotenv'
dotenv.config()
import Logger from './utils/Logger'
import { BotConfig, Command, } from './types'
import { IBot, IOnAir } from './interfaces'
import OnAir from './OnAir'
import { Client, ClientApplication, Channel, Message, Collection, REST, Routes, } from 'discord.js'
import { OnReadyMessage } from './messages'
import { readdirSync } from 'fs'
import path from 'path'

class Bot implements IBot {
    private AppToken:string;
    private ClientId:string;
    private GuildId:string;
    public commands: Collection<string, Command>;

    log: Logger;
    config: BotConfig;
    OnAir: IOnAir;
    client: Client;

    constructor(config:BotConfig) {    
        if (!config) throw new Error('No config provided, exiting.');
        this.config = config
        
        if (!this.config.onair) throw new Error('No OnAir config provided, exiting.');
        if (!this.config.discord) throw new Error('No Discord config provided, exiting.');
        this.AppToken = this.config.discord.token;
        this.ClientId = this.config.discord.clientId;
        this.GuildId = this.config.discord.guildId;

        this.log = new Logger(this.config.log);
        this.OnAir = new OnAir(this.config.onair, {
            log: this.log,
            
        });

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
    }
        

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
                    await interaction.reply({ content: 'There was an error while executing this command! Please let Eric | ZSE | TPC76 know ASAP so that a fix can occur!'
                            +'\n \nIf this is the booking or PIREP Command, please un-archive the channel as this is the reason you are getting this error', ephemeral: true });
                }
            })

            this.log.info(`✅ Loaded ${commands.length} slash commands`)
        })
    }

    async deployCommands(): Promise<void> {
        const commands = [];
        const commandFiles = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith(".ts"));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`).default;
            if (!command) continue;

            commands.push(command.data.toJSON());
            this.log.info(`Will deploy command: ${command.data.name}`)
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

    login(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.log.debug('Logging into the discord server')
            this.client.login(this.AppToken)
            return resolve();
        })
    }

    getChannelId(channelName:string):string {
        if (!this.config.discord) {
            throw new Error('No Discord config provided, exiting.');
        }

        const channelId:string = this.config.discord.channels[channelName];
        return channelId
    }

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
}

export default Bot;
