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
    Fbo as OnAirFbo,
    IOnAirApi,
} from 'onair-api';
import { OnAirApiQueryOptions, } from 'types';

import {
    IBot,
} from '.';

export interface IOnAir {
    bot:IBot;
    api:IOnAirApi;
    VirtualAirline:OnAirVirtualAirline|null;
    Notifications:OnAirNotification[]|null;
    Members:OnAirMember[]|null;
    Flights:OnAirFlight[]|null;
    Jobs:OnAirJob[]|null;
    Fleet:OnAirAircraft[]|null;
    VARoles:OnAirVARole[]|null;

    getAirportByICAO(icao: string): Promise<OnAirAirport>;
    getCompanyFleet(): Promise<OnAirAircraft[]>;
    getCompanyJobs(): Promise<OnAirJob[]>;
    getCompanyNotifications(): Promise<OnAirNotification[]> 
    getCompanyFlights(opts?:OnAirApiQueryOptions): Promise<OnAirFlight[]>;
    getCompanyDetail(companyId?:string): Promise<OnAirCompany>;
    getCompanyEmployees(companyId?:string):Promise<OnAirEmployee[]>;
    getAircraftDetail(aircraftId:string): Promise<OnAirAircraft>;
    getFlightDetail(flightId:string): Promise<OnAirFlight>;
    getEmployeeDetail(employeeId:string): Promise<OnAirEmployee>;
    getVADetail(): Promise<OnAirVirtualAirline>;
    getVAMembers(opts?:OnAirApiQueryOptions): Promise<OnAirMember[]>;
    getVAFleet(): Promise<OnAirAircraft[]>;
    getVAJobs(vaId?:string, completed?:boolean): Promise<OnAirJob[]>;
    getVAFlights(opts?:OnAirApiQueryOptions): Promise<OnAirFlight[]>;
    getVANotifications(): Promise<OnAirNotification[]>;
    getVAFBOs(): Promise<OnAirFbo[]>;
    getAircraftDetailByIdentifier(identifier:string): Promise<OnAirAircraft|undefined>;
    refreshFleetStatusChannel(): Promise<void>;
    refreshFlightsStatusChannel(): Promise<void>;
    refreshFBOsStatusChannel(): Promise<void>;
    refreshVAMembersStatusChannel(): Promise<void>;
    loadStatusChannels(): Promise<void>
}
