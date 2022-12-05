import { OnAirConfig, OnAirApiQueryOptions } from './types';
import OnAirApi, { AirportResponse, FleetResponse, IOnAirApi, JobsResponse, Member, MembersResponse, OnAirApiConfig, VirtualAirline, VirtualAirlineResponse } from 'onair-api';
import { IOnAir, IBotContext } from './interfaces';
import {  } from './types';
import { Guid } from 'onair-api/dist/types/Guid';

class OnAir implements IOnAir {
    protected Config:OnAirConfig;
    public Api:OnAirApi;
    public VA:VirtualAirline|null = null;

    constructor(config:OnAirConfig, bot:IBotContext) {
        if (!config) throw new Error('No OnAir config provided, exiting.');
        this.Config = config;

        if (!this.Config.keys.vaId) throw new Error('No VA ID provided');
        if (!this.Config.keys.apiKey) throw new Error('No API Key provided');
        if (!this.Config.keys.companyId) throw new Error('No Company ID provided');

        const onAirConfig:OnAirApiConfig = {
            vaId: this.Config.keys.vaId,
            apiKey: this.Config.keys.apiKey,
            companyId: this.Config.keys.companyId,
        }

        this.Api = new OnAirApi(onAirConfig);

        this.getVirtualAirlineDetails = this.getVirtualAirlineDetails.bind(this);
        this.getAirport = this.getAirport.bind(this);
        this.getFleet = this.getFleet.bind(this);
        this.getVAFlights = this.getVAFlights.bind(this);
        this.getJobs = this.getJobs.bind(this);
        this.getVAMembers = this.getVAMembers.bind(this);
    }

    async getVirtualAirlineDetails(vaId?:string): Promise<VirtualAirlineResponse> {
        const x = await this.Api.getVirtualAirline(new Guid(vaId) || this.Config.keys.vaId);
        return x
    }
    
    async getAirport(icao:string): Promise<AirportResponse> {
        if (!icao) throw 'no ICAO provided'

        const x:AirportResponse = await this.Api.getAirport(icao)
        return x
    }

    async getFleet():Promise<FleetResponse> {
        const x:FleetResponse = await this.Api.getCompanyFleet();
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

    async getJobs():Promise<JobsResponse> {
        const x:JobsResponse = await this.Api.getVirtualAirlineJobs();
        return x
    }
    
    async getVAMembers(opts:OnAirApiQueryOptions):Promise<MembersResponse> {
        let x:MembersResponse = await this.Api.getVirtualAirlineMembers();

        if (opts?.sortBy) {
            switch (opts.sortBy) {
                case 'role':
                    x = x.sort((a:Member, b:Member) => {

                        return (opts.sortOrder === 'asc')
                            ? a.VARole.Permission - b.VARole.Permission
                            : b.VARole.Permission - a.VARole.Permission
                    });
                break;
                case 'company':
                    x = x.sort((a:Member, b:Member) => {
                        return (opts.sortOrder === 'asc')
                            ? a.Company.Name.localeCompare(b.Company.Name)
                            : b.Company.Name.localeCompare(a.Company.Name);
                    });
                break;
                case 'flights':
                    x = x.sort((a:Member, b:Member) => {
                        return (opts.sortOrder === 'asc')
                            ? new Date(a.LastVAFlightDate).valueOf() - new Date(b.LastVAFlightDate).valueOf()
                            : new Date(b.LastVAFlightDate).valueOf() - new Date(a.LastVAFlightDate).valueOf();
                    });
                break;
                case 'total-flights':
                    x = x.sort((a:Member, b:Member) => {
                        return (opts.sortOrder === 'asc')
                            ? a.NumberOfFlights - b.NumberOfFlights
                            : b.NumberOfFlights - a.NumberOfFlights;
                    });
                break;
                case 'flight-hours':
                    x = x.sort((a:Member, b:Member) => {
                        return (opts.sortOrder === 'asc')
                            ? a.FlightHours - b.FlightHours
                            : b.FlightHours - a.FlightHours;
                    });
                break;
                case 'rep':
                    x = x.sort((a:Member, b:Member) => {
                        return (opts.sortOrder === 'asc')
                            ? a.ReputationImpact - b.ReputationImpact
                            : b.ReputationImpact - a.ReputationImpact;
                    });
                break;
            }
        }
        return x
    }
}

export default OnAir
