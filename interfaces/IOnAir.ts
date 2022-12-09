import { AirportResponse, FlightsResponse, IOnAirApi, JobsResponse, MembersResponse, VirtualAirlineResponse, CompanyResponse, Notification } from 'onair-api';
import { Aircraft, OnAirRefreshResults, Processing, VirtualAirline, RefreshCounts, Flight, Job, Member, Translators, OnAirFleetResponse, } from 'types';
import { IAircraftClassTranslator } from './IAircraftClassTranslator';
import { IAircraftEngineTranslator } from './IAircraftEngineTranslator';
import { IAircraftTranslator } from './IAircraftTranslator';
import { IAircraftTypeTranslator } from './IAircraftTypeTranslator';
import { IAirportTranslator } from './IAirportTranslator';
import { ICompanyTranslator } from './ICompanyTranslator';
import { IVirtualAirlineTranslator } from './IVirtualAirlineTranslator';

export interface IOnAir {
    Api:IOnAirApi;
    VirtualAirline:VirtualAirline|null;
    Notifications:Notification[]|null;
    Members:Member[]|null;
    Flights:Flight[]|null;
    Jobs:Job[]|null;
    Fleet:Aircraft[]|null;
    Processing:Processing;
    RefreshCounts:RefreshCounts;
    Translators: {
        AircraftClass: IAircraftClassTranslator;
        AircraftType: IAircraftTypeTranslator;
        AircraftEngine: IAircraftEngineTranslator;
        Aircraft: IAircraftTranslator;
        VirtualAirline: IVirtualAirlineTranslator;
        Airport: IAirportTranslator;
        Company: ICompanyTranslator;
    }
    setRefreshCount(type:string, count:number):void
    increaseRefreshCount(type:string, count:number):void
    setProcessing(type:string, processing?:boolean):void
    setLoading(type:string, loading?:boolean):void
    getAirport(icao: string): Promise<AirportResponse>;
    getCompanyFleet(): Promise<OnAirFleetResponse>;
    getCompanyJobs(): Promise<JobsResponse>;
    getCompanyNotifications(): Promise<Notification[]> 
    getCompanyFlights(opts?:any): Promise<FlightsResponse>;
    getCompanyDetail(companyId:string): Promise<CompanyResponse>;
    getVADetail(vaId?:string): Promise<VirtualAirlineResponse>;
    getVAFleet(): Promise<OnAirFleetResponse>;
    getVAJobs(): Promise<JobsResponse>;
    getVAFlights(opts?:any): Promise<FlightsResponse>;
    getVAMembers(opts?:any): Promise<MembersResponse>;
    getVANotifications(opts?:any): Promise<Notification[]>;
    refreshVirtualAirline():Promise<OnAirRefreshResults>
    // refreshVANotifications():Promise<OnAirRefreshResults>;
    refreshVAFleet():Promise<OnAirRefreshResults>;
}
