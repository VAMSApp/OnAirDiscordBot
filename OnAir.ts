/**
 * OnAir.ts
 * OnAir API Wrapper, Processor, and Translator for Discord Bot
 * @author Mike DeVita <mike@devita.co>
 */
import { eachOfSeries } from 'async';
import OnAirApi, {
    Aircraft as OnAirAircraft, Airport as OnAirAirport,
    Company as OnAirCompany, Flight as OnAirFlight,
    People as OnAirEmployee,
    Job as OnAirJob, Member as OnAirMember,
    Notification as OnAirNotification,
    VARole as OnAirVARole,
    VirtualAirline as OnAirVirtualAirline
} from 'onair-api';
import { isJobTaken, isJobAbandoned, isJobCompleted, isAircraftCrashed, isAircraftTransporting, HumanizeDate } from './utils';
import { IAircraftClassTranslator, IAircraftEngineTranslator, IAircraftTranslator, IAircraftTypeTranslator, IAirportTranslator, IBotContext, ICompanyTranslator, ILogger, IMemberTranslator, INotificationTranslator, IOnAir, IVARoleTranslator, IVirtualAirlineTranslator, IFlightTranslator, IBot, IEmployeeTranslator, } from './interfaces';
import { AircraftProcessor, MemberProcessor, NotificationProcessor, VirtualAirlineProcessor } from './processors';
import { AircraftClassTranslator, AircraftEngineTranslator, AircraftTranslator, AircraftTypeTranslator, AirportTranslator, CompanyTranslator, MemberTranslator, NotificationTranslator, VARoleTranslator, VirtualAirlineTranslator, FlightTranslator, EmployeeTranslator, } from './translators';
import { Aircraft, LastUpdated, Member, Notification, OnAirApiConfig, OnAirApiQueryOptions, OnAirConfig, OnAirEvent, OnAirPollingConfig, OnAirPollingsConfig, OnAirRefreshResults, PollingKeys, Processing, RefreshCounts, VirtualAirline } from './types';
import { APIEmbedField, EmbedBuilder, EmbedFooterOptions, Message, TextChannel } from 'discord.js';
import { VirtualAirlineRepo } from './repos';

export type ProcessRecordError = {
    error?: Error|string|null;
    record: any;
}

class OnAir implements IOnAir {
    public App:IBot;
    protected Config:OnAirConfig;
    public Api:OnAirApi;
    public VirtualAirline:OnAirVirtualAirline|null = null;
    public _VirtualAirline:VirtualAirline|null = null;
    public Notifications:OnAirNotification[]|null = null;
    public Members:OnAirMember[]|null = null;
    public Flights:OnAirFlight[]|null = null;
    public Jobs:OnAirJob[]|null = null;
    public Fleet:OnAirAircraft[] = [];
    public VARoles:OnAirVARole[] = [];

    public Log:ILogger;
    public Translators: {
        AircraftClass: IAircraftClassTranslator;
        AircraftType: IAircraftTypeTranslator;
        AircraftEngine: IAircraftEngineTranslator;
        Aircraft: IAircraftTranslator;
        VirtualAirline: IVirtualAirlineTranslator;
        Airport: IAirportTranslator;
        Company: ICompanyTranslator;
        Member: IMemberTranslator;
        VARole: IVARoleTranslator;
        Notification: INotificationTranslator;
        Flight: IFlightTranslator;
        Employee: IEmployeeTranslator;
    }
    
    public Processing:Processing = {
        Members: false,
        Flights: false,
        Jobs: false,
        Fleet: false,
        Notifications: false,
        VirtualAirline: false,
    }

    public Loading:Processing = {
        Members: false,
        Flights: false,
        Jobs: false,
        Fleet: false,
        Notifications: false,
        VirtualAirline: false,
    }

    public RefreshCounts:RefreshCounts = {
        Members: 0,
        Flights: 0,
        Jobs: 0,
        Fleet: 0,
        Notifications: 0,
        VirtualAirline: 0,
    }
    public Polling:PollingKeys = [];
    public LastUpdated:LastUpdated = {
        Members: null,
        Flights: null,
        Jobs: null,
        Fleet: null,
        Notifications: null,
        VirtualAirline: null,
    }

    constructor(config:OnAirConfig, app:IBot) {
        if (!config) throw new Error('No OnAir config provided, exiting.');
        if (!app) throw new Error('No Bot Context provided, exiting.');
        this.App = app;
    
        this.Translators = {
            AircraftClass: new AircraftClassTranslator(app),
            AircraftType: new AircraftTypeTranslator(app),
            AircraftEngine: new AircraftEngineTranslator(app),
            Aircraft: new AircraftTranslator(app),
            VirtualAirline: new VirtualAirlineTranslator(app),
            Airport: new AirportTranslator(app),
            Company: new CompanyTranslator(app),
            Member: new MemberTranslator(app),
            VARole: new VARoleTranslator(app),
            Notification: new NotificationTranslator(app),
            Flight: new FlightTranslator(app),
            Employee: new EmployeeTranslator(app),
        };

        this.Config = this.App.config.onair;
        this.Log = this.App.log;

        if (!this.Config.keys.vaId) throw new Error('No VA ID provided');
        if (!this.Config.keys.apiKey) throw new Error('No API Key provided');
        if (!this.Config.keys.companyId) throw new Error('No Company Id provided');

        const onAirConfig:OnAirApiConfig = {
            vaId: this.Config.keys.vaId,
            apiKey: this.Config.keys.apiKey,
            companyId: this.Config.keys.companyId,
        }

        this.Api = new OnAirApi(onAirConfig);

        this.setRefreshCount = this.setRefreshCount.bind(this);
        this.increaseRefreshCount = this.increaseRefreshCount.bind(this);
        this.setProcessing = this.setProcessing.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.getPollingConfig = this.getPollingConfig.bind(this);
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
        // this.loadVirtualAirline = this.loadVirtualAirline.bind(this);
        // this.loadVAFleet = this.loadVAFleet.bind(this);
        // this.loadVANotifications = this.loadVANotifications.bind(this);
        // this.loadVAJobs = this.loadVAJobs.bind(this);
        // this.loadAllEnabled = this.loadAllEnabled.bind(this);
        this.getCompanyFlights = this.getCompanyFlights.bind(this);
        this.getVANotifications = this.getVANotifications.bind(this);
        /**
        if (this.Config.loadOnStartup === true) {
            Object.keys(this.Config.polling).forEach((k:string) => {
                const key = k as keyof OnAirPollingsConfig;
                const cfg:OnAirPollingConfig = this.Config.polling[key];
                if (cfg.enabled === true) {
                    this.Polling.push(k);
                }
            })

            this.loadAllEnabled()
            .then(() => {
                this.Log.info('OnAir loaded all enabled data on startup');
            })
            .catch((err:Error) => {
                let msg = 'OnAir failed to load all enabled data on startup'
                if (err) {
                    const errorMessage = err instanceof Error ? err.message : err;
                    msg += ` err: ${errorMessage}`;
                }
                
                this.Log.error(msg);
            });       
        }
        */
        
        this.loadVirtualAirline();
    }

    /**
     * setRefreshCount()
     * Sets the refresh count for a given type

    @author Mike DeVita <mike@devita.co>
     * @param type string | the type of refresh count to set
     * @param count number | the number to set the refresh count to
     * @returns void
     */
    setRefreshCount(type:string, count:number):void  {
        const key = type as keyof RefreshCounts;
        this.RefreshCounts[key] = count;
    }

    /**
     * increaseRefreshCount()
     * Increases the refresh count for a given type

    @author Mike DeVita <mike@devita.co>
     * @param type string | the type of refresh count to increase
     * @param count number | the number to increase the refresh count by
     * @returns void
     */
    increaseRefreshCount(type:string, count:number = 1):void  {
        const key = type as keyof RefreshCounts;
        this.RefreshCounts[key] = this.RefreshCounts[key] + count;
    }

    /**
     * setProcessing()
     * Sets the processing state for a given type

    @author Mike DeVita <mike@devita.co>
     * @param type string | the type of processing to set
     * @param processing boolean | the processing state to set
     * @returns void
     */
    setProcessing(type:string, processing?:boolean):void {
        const key = type as keyof Processing;
        this.Processing[key] = processing || !this.Processing[key];
    }

    /**
     * setLoading()
     * Sets the loading state for a given type, if no loading state

    @author Mike DeVita <mike@devita.co>
     * is provided it will toggle the current state
     * @param type string | the type of loading to set
     * @param loading boolean | the loading state to set
     * @returns void
     */
    setLoading(type:string, loading?:boolean):void {
        const key = type as keyof Processing;
        this.Loading[key] = loading || !this.Loading[key];
    }

    /**
     * getPollingConfig()
     * Gets the polling config for a given type

    @author Mike DeVita <mike@devita.co>
     * @param name string | the name of the polling config to get
     * @returns OnAirPollingConfig
     */
    getPollingConfig(name:string):OnAirPollingConfig {
        const key = name as keyof OnAirPollingsConfig;
        return this.Config.polling[key];
    }

    /**
     * determineNotificationType()
     * Determines the type of notification based on the description

    @author Mike DeVita <mike@devita.co>
     * @param n Notification | the notification to determine the type of
     * @returns string
     */
    determineNotificationType(n:Notification):string {
        let type = 'unknown';
        if (!n.Description) return type;

        if (isJobTaken(n.Description)) {
            type = 'VAJob-Taken'
        } else if (isJobAbandoned(n.Description)) {
            type = 'VAJob-Abandoned'
        } else if (isJobCompleted(n.Description)) {
            type = 'VAJob-Completed'
        } else if (isAircraftCrashed(n.Description)) {
            type = 'Aircraft-Crashed';
        } else if (isAircraftTransporting(n.Description)) {
            type = 'Aircraft-Transporting';
        }

        return type;
    }
    
    /**
     * getAirportByICAO
     * Queries the OnAir Api for an airport's details by ICAO
     * @param icao string | the ICAO of the airport to get
     * @returns Promise<OnAirAirport>
     * @throws string
     */
    async getAirportByICAO(icao:string): Promise<OnAirAirport> {
        if (!icao) throw 'no ICAO provided'

        const x:OnAirAirport = await this.Api.getAirport(icao) as OnAirAirport;
        return x
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
        if (!aircraftId) throw 'no aircraftId provided'

        const x:OnAirAircraft = await this.Api.getAircraft(aircraftId) as OnAirAircraft;
        return x
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
        if (!flightId) throw 'no flightId provided'

        const x:OnAirFlight = await this.Api.getFlight(flightId) as OnAirFlight;
        return x
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
        if (!employeeId) throw 'no employeeId provided'

        const x:OnAirEmployee = await this.Api.getEmployee(employeeId) as OnAirEmployee;
        return x
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
        const x:OnAirAircraft[] = await this.Api.getCompanyFleet(companyId);
        return x
    }

    /**
     * getCompanyFlights()
     * Queries the OnAir Api for the instantiated company or a specific company's flights

    @author Mike DeVita <mike@devita.co>
     * @param opts OnAirApiQueryOptions |? the options to use when querying the api
     * @returns Promise<OnAirFlight[]>
     */
    async getCompanyFlights(opts?:OnAirApiQueryOptions):Promise<OnAirFlight[]> {
        let x = await this.Api.getVirtualAirlineFlights();
        if (opts?.filter) {
            const aircraftCode:string = opts.filter.aircraftCode as string;
            const companyCode:string = opts.filter.companyCode as string;
            const showcompleted:boolean = opts.filter.showcompleted as boolean;

            if (aircraftCode !== null) {
                x = x.filter(f => f.Aircraft.Identifier === aircraftCode)
            }

            if (companyCode) {
                x = x.filter(f => f.Company.AirlineCode === companyCode)
            }

            if (!showcompleted) {
                x = x.filter(f => f.StartTime && !f.EndTime)
            }
        }
        
        return x
    }

    /**
     * getCompanyJobs()
     * Queries the OnAir Api for the instantiated company or a specific company's jobs

    @author Mike DeVita <mike@devita.co>
     * @param companyId string |? the Id of the company to get the jobs for
     * @returns 
     */
    async getCompanyJobs(companyId?:string):Promise<OnAirJob[]> {
        const x:OnAirJob[] = await this.Api.getCompanyJobs(companyId);
        return x
    }

    /**
     * getCompanyDetail()
     * Queries the OnAir Api for the instantiated company or a specific company's details

    @author Mike DeVita <mike@devita.co>
     * @param companyId string |? the Id of the company to get the details for
     * @returns Promise<OnAirCompany>
     */
    async getCompanyDetail(companyId?:string):Promise<OnAirCompany> {
        const x:OnAirCompany = await this.Api.getCompany(companyId) as OnAirCompany;
        return x
    }

    /**
     * getCompanyNotifications()
     * Queries the OnAir Api for the instantiated company or a specific company's notifications

    @author Mike DeVita <mike@devita.co>
     * @param companyId string |? the Id of the company to get the notifications for
     * @returns Promise<OnAirNotification[]>
     */
    async getCompanyNotifications(companyId?:string): Promise<OnAirNotification[]> {
        const id = (companyId) ? companyId : this.Config.keys.companyId
        this.Log.debug(`getCompanyNotifications()::prerequest ${id}`)
        const x:OnAirNotification[] = await this.Api.getCompanyNotifications(id);
        return x
    }

    /**
     * getVAFlights()
     * Queries the OnAir Api for the instantiated VA or a specific VA's flights

    @author Mike DeVita <mike@devita.co>
     * @param vaId string |? the Id of the VA to get the flights for
     * @param opts OnAirApiQueryOptions |? the options to use when querying the api
     * @returns Promise<OnAirFlight[]>
     */
    async getVAFlights(vaId?:string, opts?:OnAirApiQueryOptions) {
        let x = await this.Api.getVirtualAirlineFlights(vaId);
        if (opts?.filter) {
            const aircraftCode:string = opts.filter.aircraftCode as string;
            const companyCode:string = opts.filter.companyCode as string;
            const showcompleted:boolean = opts.filter.showcompleted as boolean;

            if (aircraftCode !== null) {
                x = x.filter(f => f.Aircraft.Identifier === aircraftCode)
            }

            if (companyCode) {
                x = x.filter(f => f.Company.AirlineCode === companyCode)
            }

            if (!showcompleted) {
                x = x.filter(f => f.StartTime && !f.EndTime)
            }
        }
        
        return x
    }

    /**
     * getVAJobs()
     * Queries the OnAir Api for the instantiated VA

    @author Mike DeVita <mike@devita.co>
     * @returns Promise<OnAirJob[]>
     * @todo add ability to query for a specific VA's jobs
     */
    async getVAJobs():Promise<OnAirJob[]> {
        const x:OnAirJob[] = await this.Api.getVirtualAirlineJobs();
        return x
    }
    
    /**
     * getVAMembers()
     * Queries the OnAir Api for the instantiated VA

    @author Mike DeVita <mike@devita.co>
     * @returns Promise<OnAirMember[]>
     * @todo add ability to query for a specific VA's members
     */
    async getVAMembers():Promise<OnAirMember[]> {
        let x:OnAirMember[] = await this.Api.getVirtualAirlineMembers();

        // if (opts?.sortBy) {
        //     switch (opts.sortBy) {
        //         case 'role':
        //             x = x.sort((a:Member, b:Member) => {

        //                 return (opts.sortOrder === 'asc')
        //                     ? a.VARole.Permission - b.VARole.Permission
        //                     : b.VARole.Permission - a.VARole.Permission
        //             });
        //         break;
        //         case 'company':
        //             x = x.sort((a:Member, b:Member) => {
        //                 return (opts.sortOrder === 'asc')
        //                     ? a.Company.Name.localeCompare(b.Company.Name)
        //                     : b.Company.Name.localeCompare(a.Company.Name);
        //             });
        //         break;
        //         case 'flights':
        //             x = x.sort((a:Member, b:Member) => {
        //                 return (opts.sortOrder === 'asc')
        //                     ? new Date(a.LastVAFlightDate).valueOf() - new Date(b.LastVAFlightDate).valueOf()
        //                     : new Date(b.LastVAFlightDate).valueOf() - new Date(a.LastVAFlightDate).valueOf();
        //             });
        //         break;
        //         case 'total-flights':
        //             x = x.sort((a:Member, b:Member) => {
        //                 return (opts.sortOrder === 'asc')
        //                     ? a.NumberOfFlights - b.NumberOfFlights
        //                     : b.NumberOfFlights - a.NumberOfFlights;
        //             });
        //         break;
        //         case 'flight-hours':
        //             x = x.sort((a:Member, b:Member) => {
        //                 return (opts.sortOrder === 'asc')
        //                     ? a.FlightHours - b.FlightHours
        //                     : b.FlightHours - a.FlightHours;
        //             });
        //         break;
        //         case 'rep':
        //             x = x.sort((a:Member, b:Member) => {
        //                 return (opts.sortOrder === 'asc')
        //                     ? a.ReputationImpact - b.ReputationImpact
        //                     : b.ReputationImpact - a.ReputationImpact;
        //             });
        //         break;
        //     }
        // }
        return x
    }

    /**
     * getVAFleet()
     * Queries the OnAir Api for the instantiated VA

    @author Mike DeVita <mike@devita.co>
     * @returns Promise<OnAirAircraft[]>
     * @todo add ability to query for a specific VA's fleet
     */
    async getVAFleet():Promise<OnAirAircraft[]> {
        const x:OnAirAircraft[] = await this.Api.getVirtualAirlineFleet();
        return x
    }

    /**
     * getVADetail()
     * Queries the OnAir Api for the instantiated VA or a specific VA

    @author Mike DeVita <mike@devita.co>
     * @param vaId string |? the Id of the VA to get the details for
     * @returns Promise<OnAirVirtualAirline>
     */
    async getVADetail(vaId?:string): Promise<OnAirVirtualAirline> {
        const id = (vaId) ? vaId : this.Config.keys.vaId
        this.Log.debug(`getVADetail()::prerequest ${id}`)
        const x:OnAirVirtualAirline = await this.Api.getVirtualAirline(id) as OnAirVirtualAirline;
        return x
    }

    /**
     * getVANotifications()
     * Queries the OnAir Api for the instantiated VA or a specific VA

    @author Mike DeVita <mike@devita.co>
     * @param vaId string |? the Id of the VA to get the notifications for
     * @returns Promise<OnAirNotification[]>
     */
    async getVANotifications(vaId?:string): Promise<OnAirNotification[]> {
        const self = this;
        const id = (vaId) ? vaId : self.Config.keys.vaId
        self.Log.debug(`getVANotifications()::prerequest ${id}`)
        const x:OnAirNotification[] = await self.Api.getVirtualAirlineNotifications(id);
        return x
    }


    /**
     * loadVirtualAirline()
     * Loads the Virtual Airline from the database 

    @author Mike DeVita <mike@devita.co>
     * and sets it to the _VirtualAirline property of the class
     * 
     * @returns Promise<void>
     */
    async loadVirtualAirline(): Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            try {
                const vaId:string = self.Config.keys.vaId;
                let va:VirtualAirline = await VirtualAirlineRepo.findById(vaId) as VirtualAirline;
                if (!va) {
                    await self.refreshVirtualAirline();
                }

                self._VirtualAirline = va;
                self.increaseRefreshCount('VirtualAirline');

                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    }

    /**
     * processVANotification()
     * Processes a notification from the OnAir API

    @author Mike DeVita <mike@devita.co>
     * by creating or updating the corresponding record in the database
     * 
     * @param n OnAirNotification | the notification to process
     * @returns Promise<OnAirRefreshResults>
     */
    async processVANotification(n:OnAirNotification):Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            const processor = new NotificationProcessor(n, self.App);

            const results:OnAirRefreshResults = await processor.process({
                translate: true,
                create: true,
                update: true,
            });

            if (!results.success) return reject(results);
            self.increaseRefreshCount('Notifications');

            return resolve(results);
        })
    }
    /**
     * refreshVirtualAirline()
     * Refreshes the instantiated Virtual Airline details from the OnAir API

    @author Mike DeVita <mike@devita.co>
     * by creating or updating the corresponding record in the database
     * @returns Promise<OnAirRefreshResults>
     */
    async refreshVirtualAirline():Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            self.setProcessing('VirtualAirline', true);
            self.setRefreshCount('VirtualAirline', 0);
            let x:OnAirVirtualAirline = await self.getVADetail();
            if (!x) return reject(new Error('no VA details returned from API'))
    
            this.Log.info(`Processing Virtual Airline '${x.AirlineCode}'`)
            const processor = new VirtualAirlineProcessor(x, self.App);
            const processedVirtualAirline:VirtualAirline = await processor.process();
            this.Log.info(`Virtual Airline '${processedVirtualAirline.AirlineCode}' processed`)
            if (!processedVirtualAirline) return reject(new Error('VirtualAirline could not be processed'))

            self.increaseRefreshCount('VirtualAirline');
            self.setProcessing('VirtualAirline', false);
            const results:OnAirRefreshResults = {
                results: processedVirtualAirline,
                count: self.RefreshCounts.VirtualAirline,
                createdAt: new Date(),
                success: true,
            }
            return resolve(results);
        })
    }

    /**
     * refreshVANotifications()
     * Refreshes the instantiated Virtual Airline notifications from the OnAir API

    @author Mike DeVita <mike@devita.co>
     * by creating or updating the corresponding record in the database
     * @returns Promise<OnAirRefreshResults>
     */
    async refreshVANotifications(): Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            self.setProcessing('Notifications', true);
            self.setRefreshCount('Notifications', 0);
            const RefreshStartedAt:Date = new Date();
            let RefreshFinishedAt:Date|undefined = undefined;

            const x:OnAirNotification[] = await self.getVANotifications();
            let CreatedRecords:OnAirRefreshResults[] = [];
            let UpdatedRecords:OnAirRefreshResults[] = [];

            const totalRecords:number = x.length;
            if (!x) return reject(new Error('no VA notifications returned from API'))

            const createdAt = new Date();

            // @todo: upsert the database
            eachOfSeries(x, async function loopVANotification(n:OnAirNotification) {
                const refreshResults:OnAirRefreshResults = await self.processVANotification(n)
                if (!refreshResults) throw new Error('no results returned from processVANotification()');

                if (refreshResults.created === true) {
                    CreatedRecords.push(refreshResults.results);

                    const event:OnAirEvent = {
                        id: refreshResults.results.Id,
                        type: self.determineNotificationType(refreshResults.results.Description),
                        data: refreshResults.results,
                        createdAt: createdAt,
                    }

                    await self.App.EventHandler.publish('onair-notifications', event);

                } else if (refreshResults.updated === true) {
                    UpdatedRecords.push(refreshResults.results);
                }
            })
            .then(():void => {
                self.setProcessing('Notifications', false);
                self.Log.info(`✅ Finished Refreshing the OnAir VA Notifications.`);
                self.Log.info(`${totalRecords} total, ${CreatedRecords.length} created, ${UpdatedRecords.length} updated`);
                RefreshFinishedAt = new Date();
                
            })
            .then(() => {                
                if (self.Config.polling.VANotifications.notify === true) {
                    self.App.client.channels.fetch(self.App.getChannelId('discord'))
                    .then((channel:TextChannel) => {
                        const fieldsArray:APIEmbedField[] = [
                            {
                                name: 'Total',
                                value: `${totalRecords}`,
                                inline: true,
                            },
                            {
                                name: 'Created',
                                value: `${CreatedRecords.length}`,
                                inline: true,
                            },
                            {
                                name: 'Updated',
                                value: `${UpdatedRecords.length}`,
                                inline: true,
                            },
                        ];

                        let footerText:string = 'OnAir VA Notifications';
                        
                        if (RefreshFinishedAt) {
                            footerText = ` refreshed ${HumanizeDate(RefreshFinishedAt)}`;
                        }

                        const footer:EmbedFooterOptions = {
                            text: footerText,
                        };

                        const embed = new EmbedBuilder()
                            .setColor('#0099ff')
                            .setTitle('OnAir VA Notifications Refreshed')
                            .setURL('https://va.imperiumsim.club/notifications')
                            .setDescription(`✅ Finished Refreshing the OnAir VA Notifications.`)
                            .addFields(fieldsArray)
                            .setTimestamp(RefreshFinishedAt)
                            .setFooter(footer);

                        channel.send({
                            embeds: [embed],
                        })
                        .then((message:Message):void => {
                            const pollingConfig:OnAirPollingConfig = self.getPollingConfig('VANotification');
                            if (!pollingConfig) return;
                            
                            if (pollingConfig.autoDelete === true) {
                                setTimeout(() => {
                                    message.delete();
                                    self.Log.debug(`Deleted VANotification refresh message after ${pollingConfig.autoDeleteInterval}ms.`)
                                    return;
                                }, pollingConfig.autoDeleteInterval || 10000);
                            };

                            return;
                        });
                    })
                    .catch((err:any):void => {
                        if (err) {
                            this.Log.debug(err.message);
                        }
                    });
                }

                const results:OnAirRefreshResults = {
                    results: [
                        ...CreatedRecords,
                        ...UpdatedRecords,
                    ],
                    success: true,
                    createdAt: createdAt,
                    count: x.length,
                    createdCount: CreatedRecords.length,
                    updatedCount: UpdatedRecords.length,
                }
    
                return resolve(results);
            })
            .catch((err):void => {
                if (err) {
                    this.Log.debug(err.message);
                }

                self.setProcessing('Notifications', false);
            });
        });
    }

    /**
     * refreshVAFleet()
     * Refreshes the instantiated Virtual Airline fleet from the OnAir API

    @author Mike DeVita <mike@devita.co>
     * by creating or updating the corresponding record in the database
     * @returns Promise<OnAirRefreshResults>
     */
    async refreshVAFleet(): Promise<OnAirRefreshResults> {
        const self = this
        return new Promise(async (resolve, reject) => {
            if (self.Processing.Fleet === true || self.Loading.Fleet === true) return reject('currently processing/loading the VA Fleet');
            self.setProcessing('Fleet', true);
            self.setRefreshCount('Fleet', 0);

            const RefreshStartedAt:Date = new Date();
            let RefreshFinishedAt:Date|undefined = undefined;

            const x:OnAirAircraft[] = await self.getVAFleet();
            let CreatedRecords:OnAirRefreshResults[] = [];
            let UpdatedRecords:OnAirRefreshResults[] = [];

            const totalRecords:number = x.length;
            const createdAt = new Date();
            if (!self.Fleet || self.Fleet === null) self.Fleet = [];
            
            // @todo: upsert the database
            eachOfSeries(x, async function loopVAFleet(aircraft: OnAirAircraft) {
                if (!aircraft) return reject(new Error('no aircraft provided to process'));
                self.Log.debug(`Processing aircraft ${aircraft.Identifier}`)
                const processor = new AircraftProcessor(aircraft, self.App);
                const refreshResults:OnAirRefreshResults = await processor.process();
                if (!refreshResults) return reject(new Error(`Unable to process Aircraft ${aircraft.Identifier}`));
                self.increaseRefreshCount('Fleet');
                self.Log.debug(`Finished processing aircraft ${aircraft.Identifier}`);

                if (refreshResults.created === true) {
                    CreatedRecords.push(refreshResults.results);

                    const event:OnAirEvent = {
                        id: refreshResults.results.Id,
                        type: 'VAFleet-Added',
                        data: refreshResults.results,
                        createdAt: createdAt,
                    }

                    await self.App.EventHandler.publish('onair-notifications', event);
            
                } else if (refreshResults.updated === true) {
                    UpdatedRecords.push(refreshResults.results);
                }
            })
            .then(() => {
                if (self.Config.polling.VAFleet.notify === true) {
                    self.App.client.channels.fetch(self.App.getChannelId('discord'))
                    .then((channel:TextChannel) => {
                        const fieldsArray:APIEmbedField[] = [
                            {
                                name: 'Total',
                                value: `${totalRecords}`,
                                inline: true,
                            },
                            {
                                name: 'Created',
                                value: `${CreatedRecords.length}`,
                                inline: true,
                            },
                            {
                                name: 'Updated',
                                value: `${UpdatedRecords.length}`,
                                inline: true,
                            },
                        ];

                        let footerText:string = 'OnAir VA Fleet';
                        
                        if (RefreshFinishedAt) {
                            footerText = ` refreshed ${HumanizeDate(RefreshFinishedAt)}`;
                        }

                        const footer:EmbedFooterOptions = {
                            text: footerText,
                        };

                        const embed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Imperium OnAir VA Fleet Refreshed')
                        .setURL('https://va.imperiumsim.club/fleet')
                        .setDescription(`✅ Finished Refreshing the Imperium OnAir VA Fleet.`)
                        .addFields(fieldsArray)
                        .setTimestamp(RefreshFinishedAt)
                        .setFooter(footer);

                        channel.send({
                            embeds: [embed],
                        })
                        .then((message:Message):void => {
                            const pollingConfig:OnAirPollingConfig = self.getPollingConfig('VAFleet');
                            if (!pollingConfig) return;
                            
                            if (pollingConfig.autoDelete === true) {
                                setTimeout(() => {
                                    message.delete();
                                    self.Log.debug(`Deleted VAFleet refresh message after ${pollingConfig.autoDeleteInterval}ms.`)
                                    return;
                                }, pollingConfig.autoDeleteInterval || 10000);
                            };

                            return;
                        });

                        const results:OnAirRefreshResults = {
                            results: [
                                ...CreatedRecords,
                                ...UpdatedRecords,
                            ],
                            success: true,
                            createdAt: createdAt,
                            count: x.length,
                            createdCount: CreatedRecords.length,
                            updatedCount: UpdatedRecords.length,
                        }
            
                        return resolve(results);
                    });
                }
            })
        });
    }

    /**
     * refreshVAMembers()
     * Refreshes the instantiated Virtual Airline members from the OnAir API

    @author Mike DeVita <mike@devita.co>
     * by creating or updating the corresponding record in the database
     * @returns Promise<OnAirRefreshResults>
     */
    async refreshVAMembers(): Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (self.Processing.Members === true || self.Loading.Members === true) return reject('currently processing/loading the VA Members');
            self.setProcessing('Members', true);
            self.setRefreshCount('Members', 0);

            const RefreshStartedAt:Date = new Date();
            let RefreshFinishedAt:Date|undefined = undefined;

            const x:OnAirMember[] = await self.getVAMembers();
            let CreatedRecords:OnAirRefreshResults[] = [];
            let UpdatedRecords:OnAirRefreshResults[] = [];
            const totalRecords:number = x.length;

            const createdAt = new Date();
            if (!self.Members || self.Members === null) self.Members = [];

            eachOfSeries(x, async function loopVAMember(member: OnAirMember) {
                if (!member) return reject(new Error('no member provided to process'));
                self.Log.debug(`Processing Member ${member.Id}`)
                const processor = new MemberProcessor(member, self.App);
                const refreshResults:OnAirRefreshResults = await processor.process();
                if (!refreshResults) return reject (new Error('Member could not be processed'));
                self.increaseRefreshCount('Members');

                self.Log.debug(`Finished processing member ${member.Id}`);

                if (refreshResults.created === true) {
                    CreatedRecords.push(refreshResults.results);

                    const event:OnAirEvent = {
                        id: refreshResults.results.Id,
                        type: 'VAMember-Added',
                        data: refreshResults.results,
                        createdAt: createdAt,
                    }

                    await self.App.EventHandler.publish('onair-notifications', event);
                
                } else if (refreshResults.updated === true) {
                    UpdatedRecords.push(refreshResults.results);
                }
            })
            .then(() => {
                self.setProcessing('Members', false);

                self.Log.info(`✅Finished processing the VA Members, processed ${self.RefreshCounts.Members} records`);

                if (self.Config.polling.VAMembers.notify === true) {
                    self.App.client.channels.fetch(self.App.getChannelId('discord'))
                    .then((channel:TextChannel) => {
                        const fieldsArray:APIEmbedField[] = [
                            {
                                name: 'Total',
                                value: `${totalRecords}`,
                                inline: true,
                            },
                            {
                                name: 'Created',
                                value: `${CreatedRecords.length}`,
                                inline: true,
                            },
                            {
                                name: 'Updated',
                                value: `${UpdatedRecords.length}`,
                                inline: true,
                            },
                        ];

                        let footerText:string = 'OnAir VA Members';
                        
                        if (RefreshFinishedAt) {
                            footerText = ` refreshed ${HumanizeDate(RefreshFinishedAt)}`;
                        }

                        const footer:EmbedFooterOptions = {
                            text: footerText,
                        };

                        const embed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('OnAir VA Members Refreshed')
                        .setURL('https://va.imperiumsim.club/members')
                        .setDescription(`✅ Finished Refreshing the OnAir VA Members.`)
                        .addFields(fieldsArray)
                        .setTimestamp(RefreshFinishedAt)
                        .setFooter(footer);

                        channel.send({
                            embeds: [embed],
                        })
                        .then((message:Message):void => {
                            const pollingConfig:OnAirPollingConfig = self.getPollingConfig('VAMembers');
                            if (!pollingConfig) return;
                            
                            if (pollingConfig.autoDelete === true) {
                                setTimeout(() => {
                                    message.delete();
                                    self.Log.debug(`Deleted VAMembers refresh message after ${pollingConfig.autoDeleteInterval}ms.`)
                                    return;
                                }, pollingConfig.autoDeleteInterval || 10000);
                            };

                            return;
                        });

                        const results:OnAirRefreshResults = {
                            results: [
                                ...CreatedRecords,
                                ...UpdatedRecords,
                            ],
                            success: true,
                            createdAt: createdAt,
                            count: x.length,
                            createdCount: CreatedRecords.length,
                            updatedCount: UpdatedRecords.length,
                        }
            
                        return resolve(results);
                    });
                }

                const results:OnAirRefreshResults = {
                    results: x,
                    success: true,
                    createdAt: createdAt,
                    count: x.length,
                }
    
                return resolve(results);
            });
        });
    }
}

export default OnAir
