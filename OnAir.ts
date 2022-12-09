import { OnAirConfig, OnAirApiQueryOptions, Processing, RefreshCounts, Member, Flight, Job, OnAirRefreshResults, VirtualAirline, OnAirPollingsConfig, OnAirPollingConfig, PollingKeys, LastUpdated, OnAirAircraftResponse, OnAirFleetResponse, Aircraft, PollingKey, } from './types';
import OnAirApi, {AirportResponse, FleetResponse, JobsResponse, MembersResponse, OnAirApiConfig, VirtualAirlineResponse, CompanyResponse, Aircraft as OnAirAircraft, AircraftResponse, NotificationResponse,  Notification, } from 'onair-api';
import { IOnAir, IBotContext, ILogger, IAircraftProcessor, IAircraftClassTranslator, IAircraftEngineTranslator, IAircraftTranslator, IAircraftTypeTranslator, IVirtualAirlineTranslator, IAirportTranslator, ICompanyTranslator } from './interfaces';
import { AircraftRepo, VirtualAirlineRepo } from './repos';
import { eachOfSeries, } from 'async';
import { AircraftProcessor, VirtualAirlineProcessor, } from './processors';
import { AircraftClassTranslator, AircraftTypeTranslator, AircraftEngineTranslator, AircraftTranslator, VirtualAirlineTranslator, AirportTranslator, CompanyTranslator } from './translators';

export type ProcessRecordError = {
    error?: Error|string|null;
    record: any;
}

class OnAir implements IOnAir {
    public App:IBotContext;
    protected Config:OnAirConfig;
    public Api:OnAirApi;
    public VirtualAirline:VirtualAirline|null = null;
    public Notifications:Notification[]|null = null;
    public Members:Member[]|null = null;
    public Flights:Flight[]|null = null;
    public Jobs:Job[]|null = null;
    public Fleet:Aircraft[] = [];
    public Log:ILogger;
    public Translators: {
        AircraftClass: IAircraftClassTranslator;
        AircraftType: IAircraftTypeTranslator;
        AircraftEngine: IAircraftEngineTranslator;
        Aircraft: IAircraftTranslator;
        VirtualAirline: IVirtualAirlineTranslator;
        Airport: IAirportTranslator;
        Company: ICompanyTranslator;
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

    constructor(config:OnAirConfig, app:IBotContext) {
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
        this.getVADetail = this.getVADetail.bind(this);
        this.getAirport = this.getAirport.bind(this);
        this.getCompanyFleet = this.getCompanyFleet.bind(this);
        this.getVAJobs = this.getVAJobs.bind(this);
        this.getCompanyDetail = this.getCompanyDetail.bind(this);
        this.getVAFlights = this.getVAFlights.bind(this);
        this.getVAMembers = this.getVAMembers.bind(this);
        this.loadVirtualAirline = this.loadVirtualAirline.bind(this);
        this.loadVAFleet = this.loadVAFleet.bind(this);
        // this.loadVANotifications = this.loadVANotifications.bind(this);
        this.loadVAJobs = this.loadVAJobs.bind(this);
        this.loadAllEnabled = this.loadAllEnabled.bind(this);
        this.getCompanyFlights = this.getCompanyFlights.bind(this);
        this.getVANotifications = this.getVANotifications.bind(this);

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
    }

    setRefreshCount(type:string, count:number):void  {
        const key = type as keyof RefreshCounts;
        this.RefreshCounts[key] = count;
    }

    increaseRefreshCount(type:string, count:number = 1):void  {
        const key = type as keyof RefreshCounts;
        this.RefreshCounts[key] = this.RefreshCounts[key] + count;
    }

    setProcessing(type:string, processing?:boolean):void {
        const key = type as keyof Processing;
        this.Processing[key] = processing || !this.Processing[key];
    }

    setLoading(type:string, loading?:boolean):void {
        const key = type as keyof Processing;
        this.Loading[key] = loading || !this.Loading[key];
    }
    
    async getAirport(icao:string): Promise<AirportResponse> {
        if (!icao) throw 'no ICAO provided'

        const x:AirportResponse = await this.Api.getAirport(icao)
        return x
    }

    async getCompanyFleet():Promise<OnAirAircraft[]> {
        const x:OnAirAircraft[] = await this.Api.getCompanyFleet();
        return x
    }

    async getCompanyFlights(opts?:OnAirApiQueryOptions) {
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

    async getCompanyJobs():Promise<JobsResponse> {
        const x:JobsResponse = await this.Api.getCompanyJobs();
        return x
    }

    async getCompanyDetail(companyId:string):Promise<CompanyResponse> {
        const x:CompanyResponse = await this.Api.getCompany(companyId);
        return x
    }

    async getCompanyNotifications(vaId?:string): Promise<Notification[]> {
        const id = (vaId) ? vaId : this.Config.keys.vaId
        this.Log.debug(`getCompanyDetails()::prerequest ${id}`)
        const x:Notification[] = await this.Api.getCompanyNotifications(id);
        return x
    }

    async getVAFlights(opts?:OnAirApiQueryOptions) {
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

    async getVAJobs():Promise<JobsResponse> {
        const x:JobsResponse = await this.Api.getVirtualAirlineJobs();
        return x
    }
    
    async getVAMembers(opts:OnAirApiQueryOptions):Promise<MembersResponse> {
        let x:MembersResponse = await this.Api.getVirtualAirlineMembers();

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

    async getVAFleet():Promise<OnAirAircraft[]> {
        const x:OnAirAircraft[] = await this.Api.getVirtualAirlineFleet();
        return x
    }

    async getVADetail(vaId?:string): Promise<VirtualAirlineResponse> {
        const id = (vaId) ? vaId : this.Config.keys.vaId
        this.Log.debug(`getVADetail()::prerequest ${id}`)
        const x:VirtualAirlineResponse = await this.Api.getVirtualAirline(id);
        return x
    }

    async getVANotifications(vaId?:string): Promise<Notification[]> {
        const self = this;
        const id = (vaId) ? vaId : self.Config.keys.vaId
        self.Log.debug(`getVADetail()::prerequest ${id}`)
        const x:Notification[] = await self.Api.getVirtualAirlineNotifications(id);
        return x
    }

    async refreshVirtualAirline():Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            self.setProcessing('VirtualAirline', true);
            self.setRefreshCount('VirtualAirline', 0);
            let x:VirtualAirlineResponse = await self.getVADetail();
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
    async refreshVANotifications(): Promise<OnAirRefreshResults> {
        const self = this;
        self.setProcessing('Notifications', true);
        self.setRefreshCount('Notifications', 0);
        const x:Notification[] = await self.getVANotifications();
        const createdAt = new Date();
        
        // @todo: upsert the database
        eachOfSeries(x, async (n:NotificationResponse) => {
            const processor = new NotificationProcessor(n, self.App);
            const notification = await processor.process();
            self.increaseRefreshCount('Notifications');

        }, async (err) => {
            if (err) {
                this.Log.debug(err.message);
            }
            self.setProcessing('Fleet', false);
        });

        // @todo: send a notification to the discord channel? if enabled
        
        const results:OnAirRefreshResults = {
            results: x,
            success: true,
            createdAt: createdAt,
            count: x.length,
        }


        return results;
    }
 */
    async refreshVAFleet(): Promise<OnAirRefreshResults> {
        const self = this
        self.setProcessing('Fleet', true);
        self.setRefreshCount('Fleet', 0);

        const x:OnAirAircraft[] = await self.getVAFleet();
        const createdAt = new Date();
        if (!self.Fleet || self.Fleet === null) self.Fleet = [];
        
        // @todo: upsert the database
        eachOfSeries(x, async (aircraft: OnAirAircraft) => {
            try {
                if (!aircraft) return;
                this.Log.debug(`Processing aircraft ${aircraft.Identifier}`)
                const processor = new AircraftProcessor(aircraft, this.App);
                const processedAircraft:Aircraft = await processor.process();

                if (!processedAircraft) throw {
                    err: new Error('Aircraft could not be processed'), aircraft: aircraft
                };

                self.increaseRefreshCount('Fleet');

                this.Log.debug(`Finished processing aircraft ${aircraft.Identifier}`);

                return;
            } catch (err:any) {
                let msg = `Error processing aircraft`
                if (err) {
                    const { error, record } = err;
                    const errorMessage = error instanceof Error ? error.message : error;
                    msg += `'${record.Identifier}' err: ${errorMessage}`;
                }
                
                this.Log.error(msg);
            }
        }, async (err) => {
            if (err) {
                this.Log.error(`Error processing the VA Fleet: ${err.message}`);
            }
            self.setProcessing('Fleet', false);

            self.Log.info(`✅Finished processing the VA Fleet, processed ${self.RefreshCounts.Fleet} records`);
        
        });
        // @todo: send a notification to the discord channel? if enabled
        
        const results:OnAirRefreshResults = {
            results: x,
            success: true,
            createdAt: createdAt,
            count: x.length,
        }

        return results;
    }
    
    loadVirtualAirline():Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            let vaId:string = self.Config.keys.vaId;
            if (self.Processing.VirtualAirline === true || self.Loading.VirtualAirline === true) return;

            self.setLoading('VirtualAirline', true);
            if (!vaId) return reject('no VAId found! Double check the config.ts file');

            let virtualAirline:VirtualAirline = await VirtualAirlineRepo.findById(vaId);

            if (!virtualAirline) return reject('no VA Details found in the database yet, please ensure the "VirtualAirline" schedule is configured and enabled.');
            self.VirtualAirline = virtualAirline;
                
            if (self.Config.refreshOnStartup === true) {
                const vaDetails:OnAirRefreshResults = await self.refreshVirtualAirline();
                if (!vaDetails) return reject('No VA Details found');
                self.Log.info(`Loaded VA Details from OnAir`);
                self.VirtualAirline = vaDetails.results;
                self.LastUpdated.VirtualAirline = vaDetails.createdAt;
            }

            self.setLoading('VirtualAirline', false);

            return resolve();        
        });
    }

    loadVAFleet():Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (self.Processing.Fleet === true || self.Loading.Fleet === true) return reject('currently processing/loading the VA Fleet');
            
            if (self.VirtualAirline === null) {
                self.loadVirtualAirline()
                .then(() => {
                    self.loadVAFleet();
                    return;
                })

                return reject('no VA Details found in the database yet, please ensure the "VirtualAirline" schedule is configured and enabled.');
            }

            // try to find the fleet in the database by looking for the VAId
            const fleet:Aircraft[] = await AircraftRepo.findByVirtualAirlineId(self.VirtualAirline.Id);
            if (!fleet) return reject('no VA Fleet found');
            self.Log.info(`Loaded VA Fleet, consisting of ${fleet.length} Aircraft, from the database.`);
            self.Fleet = fleet;
                
            if (self.Config.refreshOnStartup === true) {
                const vaFleet:OnAirRefreshResults = await self.refreshVAFleet();
                if (!vaFleet) return reject('No VA Fleet found');
                self.Log.info(`Refreshed the latest VA Fleet from OnAir.`);

                self.VirtualAirline = vaFleet.results;
                self.LastUpdated.VirtualAirline = vaFleet.createdAt;
            }

            return resolve();
        });
    }
/**
    loadVANotifications():Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (self.Processing.Notifications === true) return reject('currently processing the VA Notifications');
            if ((!self.VirtualAirline || self.VirtualAirline === null)) return reject('VA is not loaded');
            if (self.VirtualAirline === null) return reject('VA is not loaded, please ensure the "VirtualAirline" schedule is configured and enabled.');

            // try to find the fleet in the database by looking for the VAId
            const notifications:Notification[] = await AircraftRepo.findByVirtualAirlineId(self.VirtualAirline.Id);
            if (!fleet) return reject('no VA Notifications found');
            self.Log.info(`Loaded VA Notifications, consisting of ${fleet.length} Aircraft, from the database.`);
            self.Notifications = fleet;
                
            if (self.Config.refreshOnStartup === true) {
                const vaNotifications:OnAirRefreshResults = await self.refreshVANotifications();
                if (!vaNotifications) return reject('No VA Notifications found');
                self.Log.info(`Refreshed the latest VA Notifications from OnAir.`);

                self.VirtualAirline = vaNotifications.results;
                self.LastUpdated.VirtualAirline = vaNotifications.createdAt;
            }

            return resolve();
        });
    }
*/ 
    loadVAJobs():Promise<void> {
        return new Promise((resolve, reject) => {
            this.Log.warn('This method is not implemented yet.')
            return resolve()
        })
    }

    loadAllEnabled():Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (self.Polling.length === 0) {
                self.Log.debug('No polling enabled, exiting');
                return reject('No polling enabled, exiting');
            }

            eachOfSeries(self.Polling, async (polling:PollingKey, k:string|number) => {
                const methodName = `load${polling}` as keyof typeof self;
                let func = self[methodName] as Function;
                if (typeof func !== 'function') throw new Error(`Method ${polling} does not exist`);
                self.Log.info(`Trying to run load${polling}...`);

                switch (methodName) {
                    case 'loadVirtualAirline':
                        self.loadVirtualAirline()
                            .then(() => {
                                self.Log.info(`✅ VA Details successfully loaded from the database!`)
                                self.loadVAFleet();
                                return;
                            })
                            .catch((err) => {
                                if (err) {
                                    self.Log.error(`Error loading VA Details: ${err}`)
                                    throw new Error(`Error loading VA Details: ${err}`)
                                } else {
                                    self.Log.error('Error loading VA Details')
                                    throw new Error(`Error loading VA Details`)
                                }
                            })
                    break;
                    case 'loadVAFleet':
                        self.loadVAFleet()
                        .then(() => {
                            self.Log.info(`✅ VA Fleet loaded from the database successfully!`)
                            return;
                        })
                        .catch((err) => {
                            if (err) {
                                self.Log.error(`Error loading VA Fleet: ${err}`)
                                throw new Error(`Error loading VA Fleet: ${err}`)
                            } else {
                                self.Log.error('Error loading VA Fleet')
                                throw new Error(`Error loading VA Fleet`)
                            }
                        })
                    break;
                    /**
                    case 'loadVANotifications':
                        self.loadVANotifications()
                        .then(() => {
                            self.Log.info(`✅ VA Notifications loaded from the database successfully!`)
                            return;
                        })
                        .catch((err) => {
                            if (err) {
                                self.Log.error(`Error loading VA Notifications: ${err}`)
                                throw new Error(`Error loading VA Notifications: ${err}`)
                            } else {
                                self.Log.error('Error loading VA Notifications')
                                throw new Error(`Error loading VA Notifications`)
                            }
                        })
                    break;
                     */
                    case 'loadVAJobs':
                        self.loadVAJobs()
                        .then(() => {
                            self.Log.info(`✅ VA Jobs loaded from the database successfully!`)
                            return;
                        })
                        .catch((err) => {
                            if (err) {
                                self.Log.error(`Error loading VA Jobs: ${err}`)
                                throw new Error(`Error loading VA Jobs: ${err}`)
                            } else {
                                self.Log.error('Error loading VA Jobs')
                                throw new Error(`Error loading VA Jobs`)
                            }
                        })
                    break;
                    default:
                        break;
                }
            }, (err?:Error|null) => {
                if (err) {
                    const errorMessage = err instanceof Error ? err.message : err;
                    self.Log.error(`Error during loading Model. error: ${errorMessage}`);
                }

                return reject(err);
            });
        });
    }
}

export default OnAir
