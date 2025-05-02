/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * OnAir.ts
 * OnAir API Wrapper, Processor, and Translator for Discord Bot
 * @author Mike DeVita <mike@devita.co>
 */
import OnAirApi, {
    Aircraft as OnAirAircraft, Airport as OnAirAirport,
    Company as OnAirCompany, Flight as OnAirFlight,
    People as OnAirEmployee,
    Job as OnAirJob, Member as OnAirMember,
    Notification as OnAirNotification,
    VARole as OnAirVARole,
    VirtualAirline as OnAirVirtualAirline,
    Fbo as OnAirFbo,
} from 'onair-api';
import { ILogger, IOnAir, IBot, } from './interfaces';
import { OnAirApiConfig, OnAirApiQueryOptions, OnAirConfig, OnAirStatus, OnAirStatusType, VirtualAirline } from './types';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Status, TextChannel } from 'discord.js';
import { FBOList, FleetList, FlightsList, MembersList } from './messages';

export type ProcessRecordError = {
    error?: Error|string|null;
    record: unknown;
}

class OnAir implements IOnAir {
    public bot:IBot;
    protected config:OnAirConfig;
    public log:ILogger;
    public api:OnAirApi;
    public VirtualAirline:OnAirVirtualAirline|null = null;
    public _VirtualAirline:VirtualAirline|null = null;
    public Notifications:OnAirNotification[]|null = null;
    public Members:OnAirMember[]|null = null;
    public Flights:OnAirFlight[]|null = null;
    public Jobs:OnAirJob[]|null = null;
    public Fleet:OnAirAircraft[] = [];
    public VARoles:OnAirVARole[] = [];
    
    constructor(config:OnAirConfig, app:IBot) {
        if (!config) throw new Error('No OnAir config provided, exiting.');
        if (!app) throw new Error('No Bot Context provided, exiting.');
        this.bot = app;

        this.config = this.bot.config.onair;
        this.log = this.bot.log;

        if (!this.config.keys.vaId) throw new Error('No VA ID provided');
        if (!this.config.keys.apiKey) throw new Error('No API Key provided');
        if (!this.config.keys.companyId) throw new Error('No Company Id provided');

        const onAirConfig:OnAirApiConfig = {
            vaId: this.config.keys.vaId,
            apiKey: this.config.keys.apiKey,
            companyId: this.config.keys.companyId,
        };

        this.api = new OnAirApi(onAirConfig);

        this.getVADetail = this.getVADetail.bind(this);
        this.getAirportByICAO = this.getAirportByICAO.bind(this);
        this.getAircraftDetail = this.getAircraftDetail.bind(this);
        this.getFlightDetail = this.getFlightDetail.bind(this);
        this.getEmployeeDetail = this.getEmployeeDetail.bind(this);
        this.getCompanyFleet = this.getCompanyFleet.bind(this);
        this.getVAJobs = this.getVAJobs.bind(this);
        this.getCompanyDetail = this.getCompanyDetail.bind(this);
        this.getVAFlights = this.getVAFlights.bind(this);
        this.getVAMembers = this.getVAMembers.bind(this);
        this.getCompanyFlights = this.getCompanyFlights.bind(this);
        this.getVANotifications = this.getVANotifications.bind(this);
        this.getVAFBOs = this.getVAFBOs.bind(this);
        this.getAircraftDetailByIdentifier = this.getAircraftDetailByIdentifier.bind(this);
        this.refreshVAFleetStatusChannel = this.refreshVAFleetStatusChannel.bind(this);
        this.refreshVAFlightsStatusChannel = this.refreshVAFlightsStatusChannel.bind(this);
    }

    
    /**
     * getAirportByICAO
     * Queries the OnAir Api for an airport's details by ICAO
     * @param icao string | the ICAO of the airport to get
     * @returns Promise<OnAirAirport>
     * @throws string
     */
    async getAirportByICAO(icao:string): Promise<OnAirAirport> {
        if (!icao) throw 'no ICAO provided';

        const x:OnAirAirport = await this.api.getAirport(icao) as OnAirAirport;
        return x;
    }

    /**
     * getAircraftDetail()
     * Queries the OnAir Api for an aircraft's details by Id

    @author Mike DeVita <mike@devita.co>
     * @param aircraftId string | the Id of the aircraft to get
     * @returns Promise<OnAirAircraft>
     * @throws string
     */
    async getAircraftDetail(aircraftId: string): Promise<OnAirAircraft> {
        if (!aircraftId) throw 'no aircraftId provided';

        const x:OnAirAircraft = await this.api.getAircraft(aircraftId) as OnAirAircraft;
        return x;
    }

    /**
     * getFlightDetail()
     * Queries the OnAir Api for a flight's details by Id

    @author Mike DeVita <mike@devita.co>
     * @param flightId string | the Id of the flight to get
     * @returns Promise<OnAirFlight>
     * @throws string
     */
    async getFlightDetail(flightId: string): Promise<OnAirFlight> {
        if (!flightId) throw 'no flightId provided';

        const x:OnAirFlight = await this.api.getFlight(flightId) as OnAirFlight;
        return x;
    }

    /**
     * getEmployeeDetail()
     * Queries the OnAir Api for an employee's details by Id

    @author Mike DeVita <mike@devita.co>
     * @param employeeId string | the Id of the employee to get
     * @returns Promise<OnAirEmployee>
     * @throws string
     */
    async getEmployeeDetail(employeeId: string): Promise<OnAirEmployee> {
        if (!employeeId) throw 'no employeeId provided';

        const x:OnAirEmployee = await this.api.getEmployee(employeeId) as OnAirEmployee;
        return x;
    }

    /**
     * getCompanyFleet()
     * Queries the OnAir Api for the instantiated company or a specific company's fleet

    @author Mike DeVita <mike@devita.co>
     * @param companyId string |? the Id of the company to get the fleet for
     * @returns Promise<OnAirAircraft[]>
     * @throws string
     */
    async getCompanyFleet(companyId?:string):Promise<OnAirAircraft[]> {
        const x:OnAirAircraft[] = await this.api.getCompanyFleet(companyId);
        return x;
    }

    /**
     * getCompanyFlights()
     * Queries the OnAir Api for the instantiated company or a specific company's flights

    @author Mike DeVita <mike@devita.co>
     * @param opts OnAirApiQueryOptions |? the options to use when querying the api
     * @returns Promise<OnAirFlight[]>
     */
    async getCompanyFlights(opts?:OnAirApiQueryOptions):Promise<OnAirFlight[]> {
        let x = await this.api.getVirtualAirlineFlights();
        if (opts?.filter) {
            const aircraftCode:string = opts.filter.aircraftCode as string;
            const companyCode:string = opts.filter.companyCode as string;
            const showcompleted:boolean = opts.filter.showcompleted as boolean;

            if (aircraftCode !== null) {
                x = x.filter(f => f.Aircraft.Identifier === aircraftCode);
            }

            if (companyCode) {
                x = x.filter(f => f.Company.AirlineCode === companyCode);
            }

            if (!showcompleted) {
                x = x.filter(f => f.StartTime && !f.EndTime);
            }
        }
        
        return x;
    }

    /**
     * getCompanyJobs()
     * Queries the OnAir Api for the instantiated company or a specific company's jobs

    @author Mike DeVita <mike@devita.co>
     * @param companyId string |? the Id of the company to get the jobs for
     * @returns 
     */
    async getCompanyJobs(companyId?:string):Promise<OnAirJob[]> {
        const x:OnAirJob[] = await this.api.getCompanyJobs(companyId);
        return x;
    }

    /**
     * getCompanyDetail()
     * Queries the OnAir Api for the instantiated company or a specific company's details

    @author Mike DeVita <mike@devita.co>
     * @param companyId string |? the Id of the company to get the details for
     * @returns Promise<OnAirCompany>
     */
    async getCompanyDetail(companyId?:string):Promise<OnAirCompany> {
        const x:OnAirCompany = await this.api.getCompany(companyId) as OnAirCompany;
        return x;
    }

    /**
     * getCompanyNotifications()
     * Queries the OnAir Api for the instantiated company or a specific company's notifications

    @author Mike DeVita <mike@devita.co>
     * @param companyId string |? the Id of the company to get the notifications for
     * @returns Promise<OnAirNotification[]>
     */
    async getCompanyNotifications(companyId?:string): Promise<OnAirNotification[]> {
        const id = (companyId) ? companyId : this.config.keys.companyId;
        this.log.debug(`getCompanyNotifications()::prerequest ${id}`);
        const x:OnAirNotification[] = await this.api.getCompanyNotifications(id);
        return x;
    }

    /**
     * getVAFlights()
     * Queries the OnAir Api for the instantiated VA or a specific VA's flights

    @author Mike DeVita <mike@devita.co>
     * @param vaId string |? the Id of the VA to get the flights for
     * @param opts OnAirApiQueryOptions |? the options to use when querying the api
     * @returns Promise<OnAirFlight[]>
     */
    async getVAFlights(opts?:OnAirApiQueryOptions) {
        const vaId:string = this.config.keys.vaId || this.config.keys.companyId;

        let x = await this.api.getVirtualAirlineFlights(vaId);
        if (opts?.filter) {
            const aircraftCode:string = opts.filter.aircraftCode as string;
            const companyCode:string = opts.filter.companyCode as string;

            if (opts.filter.aircraftCode) {
                x = x.filter(f => f.Aircraft.Identifier === aircraftCode);
            }

            if (opts.filter.companyCode) {
                x = x.filter(f => f.Company.AirlineCode === companyCode);
            }

            if (opts.filter.showcompleted === false || !opts.filter.showcompleted) {
                x = x.filter((f) => {
                    const filtered = (f.StartTime && !f.EndTime);
                    return filtered;
                });
            }
        }
        
        return x;
    }

    /**
     * getVAJobs()
     * Queries the OnAir Api for the instantiated VA

    @author Mike DeVita <mike@devita.co>
     * @returns Promise<OnAirJob[]>
     * @todo add ability to query for a specific VA's jobs
     */
    async getVAJobs(vaId?:string, completed = false):Promise<OnAirJob[]> {
        const x:OnAirJob[] = await this.api.getVirtualAirlineJobs(undefined, completed);
        return x;
    }
    
    /**
     * getVAMembers()
     * Queries the OnAir Api for the instantiated VA

    @author Mike DeVita <mike@devita.co>
     * @returns Promise<OnAirMember[]>
     * @todo add ability to query for a specific VA's members
     */
    async getVAMembers(opts?:OnAirApiQueryOptions):Promise<OnAirMember[]> {
        const x:OnAirMember[] = await this.api.getVirtualAirlineMembers();

        if (opts?.sortBy) {
            switch (opts.sortBy) {
            case 'role':
                x.sort((a:OnAirMember, b:OnAirMember) => {
                    return (opts.sortOrder === 'asc')
                        ? a.VARole.Permission - b.VARole.Permission
                        : b.VARole.Permission - a.VARole.Permission;
                });
                break;
            case 'company':
                x.sort((a:OnAirMember, b:OnAirMember) => {
                    return (opts.sortOrder === 'asc')
                        ? a.Company.Name.localeCompare(b.Company.Name)
                        : b.Company.Name.localeCompare(a.Company.Name);
                });
                break;
            case 'flight-hours':
                x.sort((a:OnAirMember, b:OnAirMember) => {
                    return (opts.sortOrder === 'asc')
                        ? a.FlightHours - b.FlightHours
                        : b.FlightHours - a.FlightHours;
                });
                break;
            case 'rep':
                x.sort((a:OnAirMember, b:OnAirMember) => {
                    return (opts.sortOrder === 'asc')
                        ? a.ReputationImpact - b.ReputationImpact
                        : b.ReputationImpact - a.ReputationImpact;
                });
                break;
            }
        }
        return x;
    }

    /**
     * getVAFleet()
     * Queries the OnAir Api for the instantiated VA

    @author Mike DeVita <mike@devita.co>
     * @returns Promise<OnAirAircraft[]>
     * @todo add ability to query for a specific VA's fleet
     */
    async getVAFleet():Promise<OnAirAircraft[]> {
        this.Fleet = await this.api.getVirtualAirlineFleet();

        return this.Fleet;
    }

    /**
     * getVADetail()
     * Queries the OnAir Api for the instantiated VA or a specific VA

    @author Mike DeVita <mike@devita.co>
     * @param vaId string |? the Id of the VA to get the details for
     * @returns Promise<OnAirVirtualAirline>
     */
    async getVADetail(vaId?:string): Promise<OnAirVirtualAirline> {
        const id = (vaId) ? vaId : this.config.keys.vaId;
        this.log.debug(`getVADetail()::prerequest ${id}`);
        const x:OnAirVirtualAirline = await this.api.getVirtualAirline(id) as OnAirVirtualAirline;
        return x;
    }

    /**
     * getVANotifications()
     * Queries the OnAir Api for the instantiated VA or a specific VA

    @author Mike DeVita <mike@devita.co>
     * @param vaId string |? the Id of the VA to get the notifications for
     * @returns Promise<OnAirNotification[]>
     */
    async getVANotifications(vaId?:string): Promise<OnAirNotification[]> {
        const id = (vaId) ? vaId : this.config.keys.vaId;
        this.log.debug(`getVANotifications()::prerequest ${id}`);
        const x:OnAirNotification[] = await this.api.getVirtualAirlineNotifications(id);
        return x;
    }

    async getVAFBOs(vaId = this.config.keys.vaId): Promise<OnAirFbo[]> {
        const x:OnAirFbo[] = await this.api.getVirtualAirlineFbos(vaId);
        
        return x;
    }

    async getAircraftDetailByIdentifier(identifier:string): Promise<OnAirAircraft|undefined> {
        let x:OnAirAircraft|undefined = undefined;

        if (this.Fleet.length === 0) {
            await this.getVAFleet();
        }

        if (this.Fleet.length > 0) {
            x = this.Fleet.find(a => a.Identifier === identifier);
        }

        return x;
    }

    async refreshVAFleetStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.fleet;
        if (!status) {
            this.log.debug('refreshVAFleetStatusChannel()::skipping, fleet status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshVAFleetStatusChannel()::skipping, fleet status is disabled');
            return;
        }

        const fleetStatusChannelId:string|null = status.channelId;

        if (!fleetStatusChannelId) {
            this.log.error('Fleet status channel ID not found in config, aborting refresh.');
            return;
        }
        
        const refreshInterval = status.interval * 1000 || 60000; // default to 1 minute

        const refreshIntervalInMin = refreshInterval / 1000 / 60; // convert to minutes
        this.log.info(`VA Fleet status refresh enabled. Starting the first VA fleet status refresh now, future refreshes will run every ${refreshIntervalInMin} ${(refreshIntervalInMin > 1) ? 'minutes.' : 'minute.'}`);

        
        const refreshVAFleetStatus = async () => {
            const channel: TextChannel | null = await this.bot.getChannel(fleetStatusChannelId) as TextChannel | null;
    
            if (channel === null) {
                this.log.error(`Unable to find channel with id ${fleetStatusChannelId}`);
                return;
            }

            // Get the last message in the channel
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();

            let msg = '';

            // Get and send new fleet status
            const vaFleet = await this.getVAFleet();

            if (!vaFleet) msg = 'No fleet found';

            msg = 'There ';

            if (vaFleet.length <= 0) {
                msg += 'are no aircraft in the VA fleet yet';
            } else if (vaFleet.length == 1) {
                msg += `is ${vaFleet.length} aircraft currently in the VA fleet`;
            } else {
                msg += `are ${vaFleet.length} aircraft currently in the VA fleet`;
            }

            const fleetList = FleetList(vaFleet);
            msg += `\n\n${fleetList}`;

            msg = this.addStatusFooter(msg, status);

            // refresh interval
            let formattedMessage = `\`\`\`\n${msg}\`\`\``;
            // If there's a last message, edit it. Otherwise, send a new message
            if (lastMessage) {
                await lastMessage.edit(formattedMessage);
            } else {
                await channel.send(formattedMessage);
            }
        }

        // Execute immediately
        refreshVAFleetStatus();

        // Then set up the interval
        setInterval(refreshVAFleetStatus, refreshInterval);
    }

    async refreshVAFlightsStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.flights;
        if (!status) {
            this.log.debug('refreshVAFlightsStatusChannel()::skipping, flights status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshVAFlightsStatusChannel()::skipping, flights status is disabled');
            return;
        }

        const flightsStatusChannelId:string|null = status.channelId;

        if (!flightsStatusChannelId) {
            this.log.error('Flights status channel ID not found in config, aborting refresh.');
            return;
        }

        const refreshInterval = status.interval * 1000 || 60000; // default to 1 minute

        const refreshIntervalInMin = refreshInterval / 1000 / 60; // convert to minutes
        this.log.info(`VA Flights Status refresh enabled. Starting the first VA status refresh now, future refreshes will run every ${refreshIntervalInMin} ${(refreshIntervalInMin > 1) ? 'minutes.' : 'minute.'}`);

        const updateFlightsStatus = async () => {
            const channel: TextChannel | null = await this.bot.getChannel(flightsStatusChannelId) as TextChannel | null;
    
            if (channel === null) {
                this.log.error(`Unable to find channel with id ${flightsStatusChannelId}`);
                return;
            }

            // Get the last message in the channel
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();

            // Get flights data
            const x: OnAirFlight[] = await this.getVAFlights();
            
            const generatePageContent = (page: number) => {
                let msg = '';
                const perPage = 10;
                const slicedFlights = x.slice((page - 1) * perPage, page * perPage);
                const totalPages = Math.ceil(x.length / perPage);
                
                const flightsList:string|undefined = FlightsList(slicedFlights);

                if (x.length <= 0) {
                    msg += 'There are no flights being tracked.';
                } else if (x.length == 1) {
                    msg += `There is ${x.length} flight being tracked.`;
                } else {
                    msg += `There are ${x.length} flights being tracked.`;
                }

                msg += ` (Page ${page} of ${totalPages})`;
                msg += `\n\n${flightsList}`;
                msg = this.addStatusFooter(msg, status);
                
                return `\`\`\`\n${msg}\`\`\``;
            };

            // Create pagination buttons
            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('first')
                        .setLabel('⏮️ First')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('previous')
                        .setLabel('◀️ Previous')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next ▶️')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('last')
                        .setLabel('Last ⏭️')
                        .setStyle(ButtonStyle.Primary)
                );

            const initialPage = 1;
            const content = generatePageContent(initialPage);

            // If there's a last message, edit it. Otherwise, send a new message
            const message = lastMessage ? 
                await lastMessage.edit({ content, components: [row] }) :
                await channel.send({ content, components: [row] });

            // Create button collector
            const collector = message.createMessageComponentCollector({ 
                time: refreshInterval 
            });

            let currentPage = initialPage;
            const totalPages = Math.ceil(x.length / 10);

            collector.on('collect', async interaction => {
                switch(interaction.customId) {
                    case 'first':
                        currentPage = 1;
                        break;
                    case 'previous':
                        currentPage = Math.max(1, currentPage - 1);
                        break;
                    case 'next':
                        currentPage = Math.min(totalPages, currentPage + 1);
                        break;
                    case 'last':
                        currentPage = totalPages;
                        break;
                }

                await interaction.update({ 
                    content: generatePageContent(currentPage),
                    components: [row]
                });
            });

            collector.on('end', () => {
                // Remove buttons when collector expires
                message.edit({ 
                    content: generatePageContent(currentPage),
                    components: [] 
                });
            });
        }

        // Execute immediately
        updateFlightsStatus();
        // Then set up the interval
        setInterval(updateFlightsStatus, refreshInterval);
    }

    async refreshVAFBOsStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.fbos;
        if (!status) {
            this.log.debug('refreshVAFBOsStatusChannel()::skipping, fbos status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshVAFBOsStatusChannel()::skipping, fbos status is disabled');
            return;
        }

        const fbosStatusChannelId:string|null = status.channelId;
        
        if (!fbosStatusChannelId) {
            this.log.error('FBOs status channel ID not found in config, aborting refresh.');
            return;
        }

        const refreshInterval = status.interval;

        const refreshIntervalInMin = refreshInterval / 60;
        this.log.info(`VA FBOs Status refresh enabled. Starting the first VA status refresh now, future refreshes will run every ${refreshIntervalInMin} ${(refreshIntervalInMin > 1) ? 'minutes.' : 'minute.'}`);

        const updateFBOsStatus = async () => {
            const channel: TextChannel | null = await this.bot.getChannel(fbosStatusChannelId) as TextChannel | null;
    
            if (channel === null) {
                this.log.error(`Unable to find channel with id ${fbosStatusChannelId}`);
                return;
            }

            // Get the last message in the channel
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();

            let msg = '';

            // Get and send new fleet status
            const x: OnAirFbo[] = await this.getVAFBOs();
            const slicedX:OnAirFbo[] = x.slice((1 - 1) * 10, 1 * 10);
            const fboList = FBOList(slicedX);

            if (x.length <= 0) {
                msg += 'The VA does not currently own any FBOs.';
            } else if (x.length == 1) {
                msg += `The VA owns ${x.length} FBO.`;
            } else {
                msg += `The VA owns ${x.length} FBOs.`;
            }
            msg += `\n\n${fboList}`;

            msg = this.addStatusFooter(msg, status);

            let formattedMessage = `\`\`\`\n${msg}\`\`\``;

            // If there's a last message, edit it. Otherwise, send a new message
            if (lastMessage) {
                await lastMessage.edit(formattedMessage);
            } else {
                await channel.send(formattedMessage);
            }
        }

        // Execute immediately
        updateFBOsStatus();
        // Then set up the interval
        setInterval(updateFBOsStatus, refreshInterval);
    }

    async refreshVAMembersStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.members;
        if (!status) {
            this.log.debug('refreshVAMembersStatusChannel()::skipping, members status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshVAMembersStatusChannel()::skipping, members status is disabled');
            return;
        }

        const membersStatusChannelId:string|null = status.channelId;

        if (!membersStatusChannelId) {
            this.log.error('Members status channel ID not found in config, aborting refresh.');
            return;
        }

        const refreshInterval = status.interval * 1000 || 60000; // default to 1 minute

        const refreshIntervalInMin = refreshInterval / 1000 / 60; // convert to minutes
        this.log.info(`VA Members Status refresh enabled. Starting the first VA status refresh now, future refreshes will run every ${refreshIntervalInMin} ${(refreshIntervalInMin > 1) ? 'minutes.' : 'minute.'}`);
        const updateMembersStatus = async () => {
            const channel: TextChannel | null = await this.bot.getChannel(membersStatusChannelId) as TextChannel | null;
            if (channel === null) {
                this.log.error(`Unable to find channel with id ${membersStatusChannelId}`);
                return;
            }
            // Get the last message in the channel
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();
            let msg = '';
            // Get and send new fleet status
            const x: OnAirMember[] = await this.getVAMembers();
            const slicedX:OnAirMember[] = x.slice((1 - 1) * 10, 1 * 10);
            const membersList:string|undefined = MembersList(slicedX);
            if (slicedX.length <= 0) {
                msg += 'There are no members in the VA.';
            } else if (slicedX.length == 1) {
                msg += `There is ${slicedX.length} member in the VA.`;
            } else {
                msg += `There are ${slicedX.length} members in the VA.`;
            }
            msg += `\n\n${membersList}`;
            msg = this.addStatusFooter(msg, status);
            let formattedMessage = `\`\`\`\n${msg}\`\`\``;
            // If there's a last message, edit it. Otherwise, send a new message
            if (lastMessage) {
                await lastMessage.edit(formattedMessage);
            } else {
                await channel.send(formattedMessage);
            }
        }

        // Execute immediately
        updateMembersStatus();
        // Then set up the interval
        setInterval(updateMembersStatus, refreshInterval);
    }

    async loadVAStatusChannels(): Promise<void> {
        this.refreshVAFleetStatusChannel();
        this.refreshVAFlightsStatusChannel();
        this.refreshVAFBOsStatusChannel();
        this.refreshVAMembersStatusChannel();
    }

    addStatusFooter(msg: string, { interval }: OnAirStatusType): string {
        // add a footer with the date and time the message was sent
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' } as Intl.DateTimeFormatOptions;
        const dateTimeString = date.toLocaleDateString('en-US', options).replace(', ', ' ');

        const refreshIntervalInMin = interval / 60;
        let msgInterval = '';

        if (refreshIntervalInMin > 1) {
            msgInterval = `Every ${refreshIntervalInMin} minutes`;
        } else {
            msgInterval = 'Every minute';
        }
        msg += `\nLast refreshed: ${dateTimeString}`;
        msg += `\nRefresh interval: ${msgInterval}`;

        return msg;
    }

}

export default OnAir;
