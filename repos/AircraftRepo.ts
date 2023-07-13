import { Company, Prisma } from '@prisma/client';
import { Aircraft, QueryOptions, TranslatedAircraft } from '../types';
import BaseRepo from './BaseRepo';

export interface IAircraftRepo {
    findByIdentifier(Identifier:string, opts:any): Promise<Aircraft>;
    findByVirtualAirlineId(vaId: string, opts?:QueryOptions): Promise<Aircraft[]>;
    create(newX:any, opts?:QueryOptions): Promise<Aircraft>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<Aircraft>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<Aircraft>;
    findAll(opts?:QueryOptions): Promise<Aircraft>;
    findById(Id:any, opts?:QueryOptions): Promise<Aircraft>;
    findFirst(opts?:QueryOptions): Promise<Aircraft>;
}

class AircraftRepoClass extends BaseRepo implements IAircraftRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.aircraft;
        this.bot?.log.info('AircraftRepo initialized');
        this.upsert = this.upsert.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findByIdentifier = this.findByIdentifier.bind(this);
        this.findByVirtualAirlineId = this.findByVirtualAirlineId.bind(this);
    }

    async create(newX:TranslatedAircraft, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            };
        }
        const data:Prisma.AircraftCreateInput = newX as Prisma.AircraftCreateInput;

        const query:Prisma.AircraftCreateArgs = {
            data: data,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.prisma.aircraft.create(query)
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

        const data:Prisma.AircraftUpdateInput = x as Prisma.AircraftUpdateInput;

        const query:Prisma.AircraftUpdateArgs = {
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
    
    async findByVirtualAirlineId(vaId: string, opts?:QueryOptions): Promise<Aircraft[]> {
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

export const AircraftRepo = new AircraftRepoClass();

