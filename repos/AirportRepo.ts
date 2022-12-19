import { Prisma } from '@prisma/client';
import { IBot } from 'interfaces';
import { Airport, QueryOptions, TranslatedAirport } from '../types';
import { Airport as OnAirAirport } from 'onair-api';
import BaseRepo from './BaseRepo'

export interface IAirportRepo {
    findByICAO(icao:string, opts:any): Promise<Airport>;
    create(newX:TranslatedAirport|Airport, opts?:QueryOptions): Promise<Airport>;
    update(Id:string, x:Prisma.AirportUpdateInput|Airport, opts?:QueryOptions): Promise<Airport>;
    updateByICAO(icao:string, x:Prisma.AirportUpdateInput|Airport, opts?:QueryOptions): Promise<Airport>;
    upsert(Id:string, payload:TranslatedAirport|Airport, opts?:QueryOptions): Promise<Airport>;
    findAll(opts?:QueryOptions): Promise<Airport[]>;
    findById(Id:string, opts?:QueryOptions): Promise<Airport>;
    findFirst(opts?:QueryOptions): Promise<Airport>;
}

class AirportRepoClass extends BaseRepo implements IAirportRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.airport
        this.bot?.log.info('AirportRepo initialized');
        this.findByICAO = this.findByICAO.bind(this)
    }

    async create(newX:TranslatedAirport|Airport, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');


        if (self.IsSyncable === true && newX.OnAirSyncedAt === undefined) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.AirportCreateArgs = {
            data: newX as Prisma.AirportCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
            .then((x:Airport) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Airport) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Airport) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async update(Id:string, x:Prisma.AirportUpdateInput|Airport, opts?:QueryOptions) {
        const self = this;
        if (!Id) throw new Error('Id is required');
        if (!x) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.AirportUpdateArgs = {
            where: {
                Id: Id,
            },
            data: x as Prisma.AirportUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.update(query)
            .then((x:Airport) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Airport) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Airport) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async updateByICAO(icao:string, x:Prisma.AirportUpdateInput|Airport, opts?:QueryOptions) {
        const self = this;
        if (!icao) throw new Error('ICAO is required');
        if (!x) throw new Error('Updated Record is required');

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.AirportUpdateArgs = {
            where: {
                ICAO: icao,
            },
            data: x as Prisma.AirportUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.update(query)
            .then((x:Airport) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Airport) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Airport) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findByICAO(icao:string, opts?:QueryOptions):Promise<Airport> {
        const self = this;
        if (!icao) throw new Error('ICAO is required');

        const query = {
            where: {
                ICAO: icao
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findUnique(query)
            .then((x:Airport) => self.determineCanSync(x))
            .then((x:Airport) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Airport) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Airport) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
}

export const AirportRepo = new AirportRepoClass();

