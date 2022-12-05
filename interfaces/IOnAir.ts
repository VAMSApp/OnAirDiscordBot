import OnAirApi, { AirportResponse, FleetResponse, FlightsResponse, IOnAirApi, JobsResponse, MembersResponse, VirtualAirline, VirtualAirlineResponse } from 'onair-api';

export interface IOnAir {
    Api:IOnAirApi;
    VA:VirtualAirline|null;
    getVirtualAirlineDetails(vaId?:string): Promise<VirtualAirlineResponse>;
    getAirport(icao: string): Promise<AirportResponse>;
    getFleet(): Promise<FleetResponse>;
    getJobs(): Promise<JobsResponse>;
    getVAFlights(opts?:any): Promise<FlightsResponse>;
    getVAMembers(opts?:any): Promise<MembersResponse>;
}
