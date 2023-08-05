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
    VirtualAirline as OnAirVirtualAirline
} from 'onair-api';
import { ILogger, IOnAir, IBot, } from './interfaces';
import { OnAirApiConfig, OnAirApiQueryOptions, OnAirConfig, VirtualAirline } from './types';

export type ProcessRecordError = {
    error?: Error|string|null;
    record: unknown;
}

class OnAir implements IOnAir {
    public App:IBot;
    protected Config:OnAirConfig;
    public Log:ILogger;
    public Api:OnAirApi;
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
        this.App = app;

        this.Config = this.App.config.onair;
        this.Log = this.App.log;

        if (!this.Config.keys.vaId) throw new Error('No VA ID provided');
        if (!this.Config.keys.apiKey) throw new Error('No API Key provided');
        if (!this.Config.keys.companyId) throw new Error('No Company Id provided');

        const onAirConfig:OnAirApiConfig = {
            vaId: this.Config.keys.vaId,
            apiKey: this.Config.keys.apiKey,
            companyId: this.Config.keys.companyId,
        };

        this.Api = new OnAirApi(onAirConfig);

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
        this.loadVAFleet = this.loadVAFleet.bind(this);
        this.getAircraftDetailByIdentifier = this.getAircraftDetailByIdentifier.bind(this);
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

        const x:OnAirAirport = await this.Api.getAirport(icao) as OnAirAirport;
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

        const x:OnAirAircraft = await this.Api.getAircraft(aircraftId) as OnAirAircraft;
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

        const x:OnAirFlight = await this.Api.getFlight(flightId) as OnAirFlight;
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

        const x:OnAirEmployee = await this.Api.getEmployee(employeeId) as OnAirEmployee;
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
        const x:OnAirAircraft[] = await this.Api.getCompanyFleet(companyId);
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
        let x = await this.Api.getVirtualAirlineFlights();
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
        const x:OnAirJob[] = await this.Api.getCompanyJobs(companyId);
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
        const x:OnAirCompany = await this.Api.getCompany(companyId) as OnAirCompany;
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
        const id = (companyId) ? companyId : this.Config.keys.companyId;
        this.Log.debug(`getCompanyNotifications()::prerequest ${id}`);
        const x:OnAirNotification[] = await this.Api.getCompanyNotifications(id);
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
        const vaId:string = this.Config.keys.vaId || this.Config.keys.companyId;
        const page:number = opts?.page || 1;
        const limit:number = opts?.limit || 100;

        let x:OnAirFlight[] = await this.Api.getVirtualAirlineFlights(vaId, page, limit);

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
        
        if (opts?.sortBy) {
            switch (opts.sortBy) {
            case 'company':
                x.sort((a:OnAirFlight, b:OnAirFlight) => {
                    return (opts.sortOrder === 'asc')
                        ? a.Company.AirlineCode.localeCompare(b.Company.AirlineCode)
                        : b.Company.AirlineCode.localeCompare(a.Company.AirlineCode);
                });
                break;
            case 'identifier':
                x.sort((a:OnAirFlight, b:OnAirFlight) => {
                    return (opts.sortOrder === 'asc')
                        ? a.Aircraft.Identifier.localeCompare(b.Aircraft.Identifier)
                        : b.Aircraft.Identifier.localeCompare(a.Aircraft.Identifier);
                });
                break;
            case 'status':
                x.sort((a:OnAirFlight, b:OnAirFlight) => {
                    return (opts.sortOrder === 'asc')
                        ? a.Aircraft.AircraftStatus - b.Aircraft.AircraftStatus
                        : b.Aircraft.AircraftStatus - a.Aircraft.AircraftStatus;
                });
                break;
            case 'departure-airport':
                x.sort((a:OnAirFlight, b:OnAirFlight) => {
                    return (opts.sortOrder === 'asc')
                        ? a.DepartureAirport.ICAO.localeCompare(b.DepartureAirport.ICAO)
                        : b.DepartureAirport.ICAO.localeCompare(a.DepartureAirport.ICAO);
                });
                break;
            case 'arrival-airport':
                x.sort((a:OnAirFlight, b:OnAirFlight) => {
                    return (opts.sortOrder === 'asc')
                        ? a.ArrivalIntendedAirport.ICAO.localeCompare(b.ArrivalIntendedAirport.ICAO)
                        : b.ArrivalIntendedAirport.ICAO.localeCompare(a.ArrivalIntendedAirport.ICAO);
                });
                break;
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
        const x:OnAirJob[] = await this.Api.getVirtualAirlineJobs(undefined, completed);
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
        const x:OnAirMember[] = await this.Api.getVirtualAirlineMembers();

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
    async getVAFleet(opts?:OnAirApiQueryOptions):Promise<OnAirAircraft[]> {
        const x:OnAirAircraft[] = await this.Api.getVirtualAirlineFleet();
        
        if (opts?.sortBy) {
            switch (opts.sortBy) {
            case 'type':
                x.sort((a:OnAirAircraft, b:OnAirAircraft) => {
                    return (opts.sortOrder === 'asc')
                        ? a.AircraftType.AircraftClass.ShortName.localeCompare(b.AircraftType.AircraftClass.ShortName)
                        : b.AircraftType.AircraftClass.ShortName.localeCompare(a.AircraftType.AircraftClass.ShortName);
                });
                break;
            case 'identifier':
                x.sort((a:OnAirAircraft, b:OnAirAircraft) => {
                    return (opts.sortOrder === 'asc')
                        ? a.Identifier.localeCompare(b.Identifier)
                        : b.Identifier.localeCompare(a.Identifier);
                });
                break;
            case 'status':
                x.sort((a:OnAirAircraft, b:OnAirAircraft) => {
                    return (opts.sortOrder === 'asc')
                        ? a.AircraftStatus - b.AircraftStatus
                        : b.AircraftStatus - a.AircraftStatus;
                });
                break;
            case 'airport':
                x.sort((a:OnAirAircraft, b:OnAirAircraft) => {
                    return (opts.sortOrder === 'asc')
                        ? a.CurrentAirport.ICAO.localeCompare(b.CurrentAirport.ICAO)
                        : b.CurrentAirport.ICAO.localeCompare(a.CurrentAirport.ICAO);
                });
                break;
            }
        }
        return x;
    }

    /**
     * getVADetail()
     * Queries the OnAir Api for the instantiated VA or a specific VA

    @author Mike DeVita <mike@devita.co>
     * @param vaId string |? the Id of the VA to get the details for
     * @returns Promise<OnAirVirtualAirline>
     */
    async getVADetail(vaId?:string): Promise<OnAirVirtualAirline> {
        const id = (vaId) ? vaId : this.Config.keys.vaId;
        this.Log.debug(`getVADetail()::prerequest ${id}`);
        const x:OnAirVirtualAirline = await this.Api.getVirtualAirline(id) as OnAirVirtualAirline;
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
        const self = this;
        const id = (vaId) ? vaId : self.Config.keys.vaId;
        self.Log.debug(`getVANotifications()::prerequest ${id}`);
        const x:OnAirNotification[] = await self.Api.getVirtualAirlineNotifications(id);
        return x;
    }

    async loadVAFleet(): Promise<OnAirAircraft[]> {
        const self = this;
        let x:OnAirAircraft[]|undefined = undefined;

        if (self.Fleet.length === 0) {
            self.Log.debug('loadVAFleet()::Getting VA fleet from OnAir Api');
            x = await self.getVAFleet();
        }

        if (x) {
            self.Fleet = x;
        }

        return self.Fleet;
    }

    async getAircraftDetailByIdentifier(identifier:string): Promise<OnAirAircraft|undefined> {
        const self = this;
        let x:OnAirAircraft|undefined = undefined;

        if (self.Fleet.length === 0) {
            await self.loadVAFleet();
        }

        if (self.Fleet.length > 0) {
            x = self.Fleet.find(a => a.Identifier === identifier);
        }

        return x;
    }
}

export default OnAir;
