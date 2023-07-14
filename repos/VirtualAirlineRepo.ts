import { Prisma, VirtualAirline } from '@prisma/client';
import { QueryOptions, } from '../types';
import BaseRepo from './BaseRepo';

export type VirtualAirlineWithRelations = Prisma.VirtualAirlineGetPayload<{
    include: {
        World: boolean;
        Member?: boolean;
        VARole?: boolean;
        Company?: boolean;
        OnAirRequest?: boolean;
    }
}>;

export interface IVirtualAirlineRepo {
    create(newX:Prisma.VirtualAirlineCreateInput, opts?:QueryOptions): Promise<VirtualAirline>;
    update(Id:string, x:Prisma.VirtualAirlineUpdateInput, opts?:QueryOptions): Promise<VirtualAirline>;
    upsert(Id:string, payload:unknown, opts?:QueryOptions): Promise<VirtualAirline>;
    findAll(opts?:QueryOptions): Promise<VirtualAirline[]>;
    findById(Id:string, opts?:QueryOptions): Promise<VirtualAirlineWithRelations|null>;
    findFirst(opts?:QueryOptions): Promise<VirtualAirline|null>;
}

class VirtualAirlineRepoClass extends BaseRepo implements IVirtualAirlineRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.virtualAirline;
        this.bot?.log.info('VirtualAirlineRepo initialized');
    }

    async findById(Id:string, opts?:QueryOptions):Promise<VirtualAirlineWithRelations|null> {
        if  (!Id) throw new Error('Id is required');
        
        const query:Prisma.VirtualAirlineFindUniqueArgs = {
            where: {
                Id: Id,
            },
            include: (opts?.include) ? opts.include : undefined,
        };
        
        const x:VirtualAirlineWithRelations|null = await this.Model.findUnique(query)
            .then((x:VirtualAirline) => (x && opts?.omit) ? this.omit(x, opts.omit) : x)
            .then((x:VirtualAirline) => (x && opts?.humanize) ? this.humanize(x, opts.humanize) : x)
            .then((x:VirtualAirline) => (x && opts?.serialize) ? this.serialize(x) : x);

        return x;
    }
}

export const VirtualAirlineRepo = new VirtualAirlineRepoClass();

