import { Company, Prisma } from '@prisma/client';
import { Flight, QueryOptions, TranslatedFlight } from '../types';
import BaseRepo from './BaseRepo';

export interface IFlightRepo {
    findByIdentifier(Identifier:string, opts:any): Promise<Flight>;
    findByVirtualAirlineId(vaId: string, opts?:QueryOptions): Promise<Flight[]>;
    create(newX:any, opts?:QueryOptions): Promise<Flight>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<Flight>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<Flight>;
    findAll(opts?:QueryOptions): Promise<Flight>;
    findById(Id:any, opts?:QueryOptions): Promise<Flight>;
    findFirst(opts?:QueryOptions): Promise<Flight>;
}

class FlightRepoClass extends BaseRepo implements IFlightRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.flight;
        this.bot?.log.info('FlightRepo initialized');
        this.upsert = this.upsert.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findByIdentifier = this.findByIdentifier.bind(this);
        this.findByVirtualAirlineId = this.findByVirtualAirlineId.bind(this);
    }

    async create(newX:TranslatedFlight, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            };
        }
        const data:Prisma.FlightCreateInput = newX as Prisma.FlightCreateInput;

        const query:Prisma.FlightCreateArgs = {
            data: data,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.prisma.flight.create(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x);
    }

    async update(Id:any, x:any, opts?:QueryOptions) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            };
        }

        const data:Prisma.FlightUpdateInput = x as Prisma.FlightUpdateInput;

        const query:Prisma.FlightUpdateArgs = {
            where: {
                Id: (typeof Id !== 'string') ? Id.toString() : Id,
            },
            data: data,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.update(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x);
    }


    async findByIdentifier(Identifier:string, opts:any) {
        const self = this;
        if (!Identifier) throw new Error('Identifier is required');

        const query = {
            where: {
                Identifier: Identifier
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.findUnique(query)
            .then((x:any) => self.determineCanSync(x))
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x);
    }
    
    async findByVirtualAirlineId(vaId: string, opts?:QueryOptions): Promise<Flight[]> {
        const self = this;
        if (!vaId) throw new Error('vaId is required');

        const query = {
            where: {
                CurrentCompany: vaId
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.findMany(query)
            .then((x:any) => self.determineCanSync(x))
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x);
        throw new Error('Method not implemented.');
    }
}

export const FlightRepo = new FlightRepoClass();

