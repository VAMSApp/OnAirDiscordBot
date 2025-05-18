/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * OnAir.ts
 * OnAir API Wrapper, Processor, and Translator for Discord Bot
 * @author Mike DeVita <mike@devita.co>
 */
import OnAirApi from 'onair-api';
import { ILogger, IOnAir, IBot, } from './interfaces';
import { OnAirAircraft, OnAirAirport, OnAirApiConfig, OnAirApiQueryOptions, OnAirCompany, OnAirCompanyDetail, OnAirConfig, OnAirEmployee, OnAirFbo, OnAirFlight, OnAirJob, OnAirMember, OnAirNotification, OnAirStatusType, OnAirVARole, OnAirVirtualAirline, OnAirVirtualAirlineDetail } from './types';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel } from 'discord.js';
import { CompanyDetail, FBOList, FleetList, FlightsList, MembersList, VADetail } from './messages';
import { FormatTimeInterval } from './utils';

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
    public Notifications:OnAirNotification[]|null = null;
    public Members:OnAirMember[]|null = null;
    public Flights:OnAirFlight[]|null = null;
    public Jobs:OnAirJob[]|null = null;
    public Fleet:OnAirAircraft[] = [];
    public VARoles:OnAirVARole[] = [];
    public FBOs:OnAirFbo[] = [];

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

        this.getVADetail                   = this.getVADetail.bind(this);
        this.getAirportByICAO              = this.getAirportByICAO.bind(this);
        this.getAircraftDetail             = this.getAircraftDetail.bind(this);
        this.getFlightDetail               = this.getFlightDetail.bind(this);
        this.getEmployeeDetail             = this.getEmployeeDetail.bind(this);
        this.getCompanyFleet               = this.getCompanyFleet.bind(this);
        this.getVAJobs                     = this.getVAJobs.bind(this);
        this.getCompanyDetail              = this.getCompanyDetail.bind(this);
        this.getVAFlights                  = this.getVAFlights.bind(this);
        this.getCompanyEmployees           = this.getCompanyEmployees.bind(this);
        this.getVAMembers                  = this.getVAMembers.bind(this);
        this.getCompanyFlights             = this.getCompanyFlights.bind(this);
        this.getVANotifications            = this.getVANotifications.bind(this);
        this.getVAFBOs                     = this.getVAFBOs.bind(this);
        this.getAircraftDetailByIdentifier = this.getAircraftDetailByIdentifier.bind(this);
        this.refreshFleetStatusChannel     = this.refreshFleetStatusChannel.bind(this);
        this.refreshFlightsStatusChannel   = this.refreshFlightsStatusChannel.bind(this);
        this.refreshDetailStatusChannel    = this.refreshDetailStatusChannel.bind(this);
        this._updateDetailStatus           = this._updateDetailStatus.bind(this);
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
    async getCompanyFleet(companyId:string = this.config.keys.companyId):Promise<OnAirAircraft[]> {
        const x:OnAirAircraft[] = await this.api.getCompanyFleet(companyId)
        .then((fleet: OnAirAircraft[]) => {
            return fleet.filter((a: OnAirAircraft) => {
                return a.CurrentCompanyId === companyId || a.RentCompanyId === companyId;
            });
        });

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

    async getCompanyEmployees(companyId?:string):Promise<OnAirEmployee[]> {
        const x:OnAirEmployee[] = await this.api.getCompanyEmployees(companyId);

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
    async getCompanyDetail(companyId:string = this.config.keys.companyId):Promise<OnAirCompany> {
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
    async getCompanyNotifications(companyId:string = this.config.keys.companyId): Promise<OnAirNotification[]> {
        this.log.debug(`getCompanyNotifications()::prerequest ${companyId}`);
        const x:OnAirNotification[] = await this.api.getCompanyNotifications(companyId);
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
    async getVAJobs(vaId:string = this.config.keys.vaId, completed = false):Promise<OnAirJob[]> {
        const x:OnAirJob[] = await this.api.getVirtualAirlineJobs(vaId, completed);
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
    async getVAFleet(vaId:string = this.config.keys.vaId):Promise<OnAirAircraft[]> {
        this.Fleet = await this.api.getVirtualAirlineFleet(vaId)
        .then((fleet: OnAirAircraft[]) => {
            return fleet.filter((a: OnAirAircraft) => {
                return a.CurrentCompanyId === vaId || a.RentCompanyId === vaId;
            });
        });

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

    async refreshFleetStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.fleet;
        if (!status) {
            this.log.debug('refreshFleetStatusChannel()::skipping, fleet status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshFleetStatusChannel()::skipping, fleet status is disabled');
            return;
        }

        const fleetStatusChannelId:string|null|undefined = status.channelId;

        if (!fleetStatusChannelId) {
            this.log.error('Fleet status channel ID not found in config, aborting refresh.');
            return;
        }
        
        let refreshInterval = status.interval * 1000 || 60000; // default to 1 minute

        if (refreshInterval < 30000) {
            this.log.warn(`${this.config.opMode || 'VA'} Fleet refresh interval is too short (${status.interval}s), setting to minimum of 30 seconds.`);
            refreshInterval = 30000;
        }

        this.log.info(`${this.config.opMode || 'VA'} Fleet status refresh enabled. Starting the first ${this.config.opMode || 'VA'} fleet status refresh now, future refreshes will run every ${FormatTimeInterval(refreshInterval)}.`);

        const refreshFleetStatus = async () => {
            const channel: TextChannel | null = await this.bot.getChannel(fleetStatusChannelId) as TextChannel | null;
    
            if (channel === null) {
                this.log.error(`Unable to find channel with id ${fleetStatusChannelId}`);
                return;
            }

            // Get the last message in the channel
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();

            // Get and send new fleet status
            this.Fleet = await this.getVAFleet();

            const x: OnAirAircraft[] = this.Fleet;

            const generatePageContent = (page: number) => {
                let msg = '';
                const perPage = status.pageSize || 10;
                const slicedFleet = x.slice((page - 1) * perPage, page * perPage);
                const totalPages = Math.ceil(x.length / perPage);
                
                const fleetList = FleetList(slicedFleet);

                if (x.length <= 0) {
                    msg += `There are no aircraft in the ${this.config.opMode || 'VA'} fleet yet`;
                } else if (x.length == 1) {
                    msg += `There is ${x.length} aircraft currently in the ${this.config.opMode || 'VA'} fleet`;
                } else {
                    msg += `There are ${x.length} aircraft currently in the ${this.config.opMode || 'VA'} fleet`;
                }

                // Only show page information if there's more than one page
                if (totalPages > 1) {
                    msg += ` (Page ${page} of ${totalPages})`;
                }
                msg += `\n\n${fleetList}`;
                msg = this.addStatusFooter(msg, status);
                
                return `\`\`\`\n${msg}\`\`\``;
            };

            const initialPage = 1;
            const totalPages = Math.ceil(x.length / (status.pageSize || 10));
            const content = generatePageContent(initialPage);

            // Only create buttons if there's more than one page
            let components: ActionRowBuilder<ButtonBuilder>[] = [];
            if (totalPages > 1) {
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
                components = [row];
            }

            // If there's a last message, edit it. Otherwise, send a new message
            const message = lastMessage ? 
                await lastMessage.edit({ content, components }) :
                await channel.send({ content, components });

            // Only create collector if there's more than one page
            if (totalPages > 1) {
                const collector = message.createMessageComponentCollector({ 
                    time: refreshInterval
                });

                let currentPage = initialPage;

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
                        components: components
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
        }

        // Execute immediately
        refreshFleetStatus();
        // Then set up the interval
        setInterval(refreshFleetStatus, refreshInterval);
    }

    async refreshDetailStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.detail;
        if (!status) {
            this.log.debug('refreshDetailStatusChannel()::skipping, detail status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshDetailStatusChannel()::skipping, detail status is disabled');
            return;
        }

        const detailStatusChannelId:string|null|undefined = status.channelId;

        if (!detailStatusChannelId) {
            this.log.error(`${this.config.opMode || 'VA'} detail status channel ID not found in config, aborting refresh.`);
            return;
        }

        let refreshInterval = status.interval * 1000 || 60000; // default to 1 minute

        if (refreshInterval < 15000) {
            this.log.warn(`${this.config.opMode || 'VA'} detail status refresh interval is too short (${status.interval}s), setting to minimum of 30 seconds.`);
            refreshInterval = 15000;
        }

        this.log.info(`${this.config.opMode || 'VA'} detail status refresh enabled. Starting the first ${this.config.opMode || 'VA'} detail status refresh now, future refreshes will run every ${FormatTimeInterval(refreshInterval)}.`);

        const updateDetailStatus = async () => {
            await this._updateDetailStatus(detailStatusChannelId);
        }

        // Execute immediately
        await updateDetailStatus();

        // Then set up the interval
        setInterval(updateDetailStatus, refreshInterval);
    }

    private async _updateDetailStatus(channelId:string): Promise<void> {
        const channel: TextChannel | null = await this.bot.getChannel(channelId) as TextChannel | null;
    
        if (channel === null) {
            this.log.error(`Unable to find channel with id ${channelId}`);
            return;
        }

        // Get the last message in the channel
        const messages = await channel.messages.fetch({ limit: 1 });
        const lastMessage = messages.first();

        let msg = '';

        let x: OnAirCompanyDetail|OnAirVirtualAirlineDetail|undefined = undefined;
        let detail: OnAirCompany|OnAirVirtualAirline|undefined = undefined;
        let fleet:OnAirAircraft[] = [];
        let flights:OnAirFlight[] = [];
        let members:OnAirMember[] = [];
        let employees:OnAirEmployee[] = [];

        // Get the detail for the company or VA
        if (this.config.opMode === 'Company') {
            detail = await this.getCompanyDetail();
            fleet = await this.getCompanyFleet();
            flights = await this.getCompanyFlights();
            employees = await this.getCompanyEmployees();

            const flightHours:number = flights.reduce((a:number, b:OnAirFlight) => {
                if (b.AirborneTime) {
                    return a + parseFloat(b.AirborneTime);
                }
    
                return a;
            }, 0);
            
            x = {
                ...detail,
                EmployeeCount: employees.length,
                Employees: employees,
                FleetCount: fleet.length || 0,
                FlightCount: flights.length || 0,
                FlightHours: flightHours,
            }

            msg = CompanyDetail(x as OnAirCompanyDetail) || '';

        } else {
            detail = await this.getVADetail();
            fleet = await this.getVAFleet();
            flights = await this.getVAFlights();
            members = await this.getVAMembers();
        
            const flightHours:number = flights.reduce((a:number, b:OnAirFlight) => {
                if (b.AirborneTime) {
                    return a + parseFloat(b.AirborneTime);
                }
    
                return a;
            }, 0);

            x = {
                ...detail,
                MemberCount: members.length,
                Members: members,
                FleetCount: fleet.length || 0,
                FlightCount: flights.length || 0,
                FlightHours: flightHours,
            }

            msg = VADetail(x as OnAirVirtualAirlineDetail) || '';
        }
        
        if (!x) {
            msg += 'There is no company detail available.';
        }

        // If there's a last message, edit it. Otherwise, send a new message
        if (lastMessage) {
            await lastMessage.edit(msg);
        } else {
            await channel.send(msg);
        }
    }

    async refreshFlightsStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.flights;
        if (!status) {
            this.log.debug('refreshFlightsStatusChannel()::skipping, flights status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshFlightsStatusChannel()::skipping, flights status is disabled');
            return;
        }

        const flightsStatusChannelId:string|null|undefined = status.channelId;

        if (!flightsStatusChannelId) {
            this.log.error('Flights status channel ID not found in config, aborting refresh.');
            return;
        }

        let refreshInterval = status.interval * 1000 || 60000; // default to 1 minute

        if (refreshInterval < 15000) {
            this.log.warn(`${this.config.opMode || 'VA'} Flights refresh interval is too short (${status.interval}s), setting to minimum of 15 seconds.`);
            refreshInterval = 15000;
        }

        this.log.info(`${this.config.opMode || 'VA'} Flights Status refresh enabled. Starting the first ${this.config.opMode || 'VA'} Flights refresh now, future refreshes will run every ${FormatTimeInterval(refreshInterval)}.`);

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
            this.Flights = await this.getVAFlights();

            const x: OnAirFlight[] = this.Flights;
            const inProgressFlights: OnAirFlight[] = x.filter((f:OnAirFlight) => f.Registered !== true && !f.CancelReason);

            const generatePageContent = (page: number) => {
                let msg = '';
                const perPage = status.pageSize || 10;
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
                time: refreshInterval * 1000 // Convert seconds to milliseconds
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

    async refreshFBOsStatusChannel(): Promise<void> {
        const status: OnAirStatusType|undefined = this.config.status?.fbos;
        if (!status) {
            this.log.debug('refreshFBOsStatusChannel()::skipping, fbos status config is missing. Check the config.ts file.');
            return;
        }

        if (!status.enabled) {
            this.log.debug('refreshFBOsStatusChannel()::skipping, fbos status is disabled');
            return;
        }

        const fbosStatusChannelId:string|null|undefined = status.channelId;
        
        if (!fbosStatusChannelId) {
            this.log.error('FBOs status channel ID not found in config, aborting refresh.');
            return;
        }

        let refreshInterval = status.interval * 1000 || 60000;
        if (refreshInterval < 30000) {
            this.log.warn(`VA FBOs refresh interval is too short (${status.interval}s), setting to minimum of 30 seconds.`);
            refreshInterval = 30000;
        }

        this.log.info(`${this.config.opMode || 'VA'} FBOs Status refresh enabled. Starting the first ${this.config.opMode || 'VA'} FBO refresh now, future refreshes will run every ${FormatTimeInterval(refreshInterval)}.`);

        const updateFBOsStatus = async () => {
            const channel: TextChannel | null = await this.bot.getChannel(fbosStatusChannelId) as TextChannel | null;
    
            if (channel === null) {
                this.log.error(`Unable to find channel with id ${fbosStatusChannelId}`);
                return;
            }
            this.log.info(`refreshFBOsStatusChannel()::refreshing FBOs status in channel #${channel.name}`);

            // Get the last message in the channel
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();

            // Get and send new fleet status
            this.FBOs = await this.getVAFBOs();

            const x: OnAirFbo[] = this.FBOs;

            const generatePageContent = (page: number) => {
                let msg = '';
                const perPage = status.pageSize || 5;
                const slicedFBOs = x.slice((page - 1) * perPage, page * perPage);
                const totalPages = Math.ceil(x.length / perPage);
                
                const fboList = FBOList(slicedFBOs);

                if (x.length <= 0) {
                    msg += 'The VA does not currently own any FBOs.';
                } else if (x.length == 1) {
                    msg += `The VA owns ${x.length} FBO.`;
                } else {
                    msg += `The VA owns ${x.length} FBOs.`;
                }

                // Only show page information if there's more than one page
                if (totalPages > 1) {
                    msg += ` (Page ${page} of ${totalPages})`;
                }
                msg += fboList;
                msg = this.addStatusFooter(msg, status);
                
                return `\`\`\`\n${msg}\`\`\``;
            };

            const initialPage = 1;
            const totalPages = Math.ceil(x.length / (status.pageSize || 5));
            const content = generatePageContent(initialPage);

            // Only create buttons if there's more than one page
            let components: ActionRowBuilder<ButtonBuilder>[] = [];
            if (totalPages > 1) {
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
                components = [row];
            }

            // If there's a last message, edit it. Otherwise, send a new message
            const message = lastMessage ? 
                await lastMessage.edit({ content, components }) :
                await channel.send({ content, components });

            // Only create collector if there's more than one page
            if (totalPages > 1) {
                const collector = message.createMessageComponentCollector({ 
                    time: refreshInterval
                });

                let currentPage = initialPage;

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
                        components: components
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

        const membersStatusChannelId:string|null|undefined = status.channelId;

        if (!membersStatusChannelId) {
            this.log.error('Members status channel ID not found in config, aborting refresh.');
            return;
        }

        if (this.config.opMode !== 'VA') {
            this.log.debug('refreshVAMembersStatusChannel()::skipping, members status is not enabled for this mode.');
            let msg = 'Bot is running in Company mode. Member status refresh is not enabled for this mode. Please set the ONAIR_OPERATION_MODE to VA to enable.';

            this.bot.sendMessageToChannel(membersStatusChannelId, `\`\`\`\n${msg}\`\`\``)
            return;
        }

        let refreshInterval = status.interval * 1000 || 60000; // default to 1 minute

        if (refreshInterval < 30000) {
            this.log.warn(`VA Members refresh interval is too short (${refreshInterval}ms), setting to 30 seconds.`);
            refreshInterval = 3000;
        }

        this.log.info(`VA Members Status refresh enabled. Starting the first VA status refresh now, future refreshes will run every ${FormatTimeInterval(refreshInterval)}.`);

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
            this.Members = await this.getVAMembers();

            const x: OnAirMember[] = this.Members;
            
            // Get sort column from config if specified, default to company name
            const sortColumn = (status as OnAirStatusType).sortColumn || 'Company';
            
            // Sort members array based on the specified column
            const sortedX = x.sort((a:OnAirMember, b:OnAirMember) => {
                switch(sortColumn) {
                    case 'Role':
                        return a.VARole.Permission - b.VARole.Permission;
                    case 'Reputation':
                        return b.Company.Reputation - a.Company.Reputation;
                    case 'Flights':
                        return b.NumberOfFlights - a.NumberOfFlights;
                    case 'Hours':
                        return b.FlightHours - a.FlightHours;
                    case 'LastFlight':
                        return new Date(b.LastVAFlightDate).getTime() - new Date(a.LastVAFlightDate).getTime();
                    case 'Pax':
                        // Sort by total passengers transported
                        return b.TotalPAXsTransported - a.TotalPAXsTransported;
                    case 'Cargo':
                        // Sort by total cargo transported
                        return b.TotalCargosTransportedLbs - a.TotalCargosTransportedLbs;
                    case 'Pax & Cargo':
                        // Sort by combined total of passengers and cargo
                        const totalA = a.TotalPAXsTransported + a.TotalCargosTransportedLbs;
                        const totalB = b.TotalPAXsTransported + b.TotalCargosTransportedLbs;
                        return totalB - totalA;
                    case 'Company':
                    case 'Earnings':
                        return b.TotalEarnedCredits - a.TotalEarnedCredits;
                    default:
                        return a.Company.Name.localeCompare(b.Company.Name);
                }
            });

            const membersList:string|undefined = MembersList(sortedX);

            if (x.length <= 0) {
                msg += 'There are no members in the VA.';
            } else if (x.length == 1) {
                msg += `There is ${x.length} member in the VA. (Sorted by ${sortColumn})`;
            } else {
                msg += `There are ${x.length} members in the VA. (Sorted by ${sortColumn})`;
            }

            msg += membersList;
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

    async loadStatusChannels(): Promise<void> {
        if (!this.config.status) {
            this.log.debug('loadStatusChannels()::skipping, status config is missing. Check the config.ts file.');
            return;
        }
        
        this.refreshDetailStatusChannel();
        this.refreshFleetStatusChannel();
        this.refreshFlightsStatusChannel();
        this.refreshFBOsStatusChannel();
        this.refreshVAMembersStatusChannel();
    }

    addStatusFooter(msg: string, { interval }: OnAirStatusType): string {
        // add a footer with the date and time the message was sent
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' } as Intl.DateTimeFormatOptions;
        const dateTimeString = date.toLocaleDateString('en-US', options).replace(', ', ' ');

        let msgInterval = `Every ${FormatTimeInterval(interval*1000)}`;
        msg += '\n----';
        msg += `\nLast refreshed: ${dateTimeString} (UTC)`;
        msg += `\nRefresh interval: ${msgInterval}`;

        return msg;
    }

}

export default OnAir;
