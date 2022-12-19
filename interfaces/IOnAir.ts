import {
    Airport as OnAirAirport,
    Flight as OnAirFlight,
    Notification as OnAirNotification,
    VirtualAirline as OnAirVirtualAirline,
    Job as OnAirJob,
    Aircraft as OnAirAircraft,
    Member as OnAirMember,
    Company as OnAirCompany,
    VARole as OnAirVARole,
    People as OnAirEmployee,
    IOnAirApi,
} from 'onair-api';
import { Aircraft, OnAirRefreshResults, Processing, VirtualAirline, RefreshCounts, Flight, Job, Member, Translators, OnAirFleetResponse, } from 'types';
import {
    IAircraftClassTranslator,
    IAircraftEngineTranslator,
    IAircraftTranslator,
    IAircraftTypeTranslator,
    IAirportTranslator,
    IBot,
    ICompanyTranslator,
    IEmployeeTranslator,
    IFlightTranslator,
    IMemberTranslator,
    INotificationTranslator,
    IVARoleTranslator,
    IVirtualAirlineTranslator,
} from '.';

export interface IOnAir {
    App:IBot;
    Api:IOnAirApi;
    VirtualAirline:OnAirVirtualAirline|null;
    Notifications:OnAirNotification[]|null;
    Members:OnAirMember[]|null;
    Flights:OnAirFlight[]|null;
    Jobs:OnAirJob[]|null;
    Fleet:OnAirAircraft[]|null;
    VARoles:OnAirVARole[]|null;

    Processing:Processing;
    RefreshCounts:RefreshCounts;

    Translators: {
        AircraftClass: IAircraftClassTranslator;
        AircraftType: IAircraftTypeTranslator;
        AircraftEngine: IAircraftEngineTranslator;
        Aircraft: IAircraftTranslator;
        VirtualAirline: IVirtualAirlineTranslator;
        Member: IMemberTranslator;
        Company: ICompanyTranslator;
        VARole: IVARoleTranslator;
        Airport: IAirportTranslator;
        Notification: INotificationTranslator;
        Flight: IFlightTranslator;
        Employee: IEmployeeTranslator;
    }
    setRefreshCount(type:string, count:number):void
    increaseRefreshCount(type:string, count:number):void
    setProcessing(type:string, processing?:boolean):void
    setLoading(type:string, loading?:boolean):void;
    getAirportByICAO(icao: string): Promise<OnAirAirport>;
    getCompanyFleet(): Promise<OnAirAircraft[]>;
    getCompanyJobs(): Promise<OnAirJob[]>;
    getCompanyNotifications(): Promise<OnAirNotification[]> 
    getCompanyFlights(opts?:any): Promise<OnAirFlight[]>;
    getCompanyDetail(companyId:string): Promise<OnAirCompany>;
    getAircraftDetail(aircraftId:string): Promise<OnAirAircraft>;
    getFlightDetail(flightId:string): Promise<OnAirFlight>;
    getEmployeeDetail(employeeId:string): Promise<OnAirEmployee>;
    getVADetail(vaId?:string): Promise<OnAirVirtualAirline>;
    getVAFleet(): Promise<OnAirAircraft[]>;
    getVAJobs(): Promise<OnAirJob[]>;
    getVAFlights(opts?:any): Promise<OnAirFlight[]>;
    getVAMembers(opts?:any): Promise<OnAirMember[]>;
    getVANotifications(opts?:any): Promise<OnAirNotification[]>;
    refreshVirtualAirline():Promise<OnAirRefreshResults>
    refreshVANotifications():Promise<OnAirRefreshResults>;
    refreshVAFleet():Promise<OnAirRefreshResults>;
    refreshVAMembers():Promise<OnAirRefreshResults>;
}
