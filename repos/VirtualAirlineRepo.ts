import { Prisma } from '@prisma/client';
import { QueryOptions, VirtualAirline } from '../types';
import BaseRepo from './BaseRepo';

export interface IVirtualAirlineRepo {
    create(newX:Prisma.VirtualAirlineCreateInput, opts?:QueryOptions): Promise<VirtualAirline>;
    update(Id:string, x:Prisma.VirtualAirlineUpdateInput, opts?:QueryOptions): Promise<VirtualAirline>;
    upsert(Id:string, payload:unknown, opts?:QueryOptions): Promise<VirtualAirline>;
    findAll(opts?:QueryOptions): Promise<VirtualAirline[]>;
    findById(Id:string, opts?:QueryOptions): Promise<VirtualAirline|null>;
    findFirst(opts?:QueryOptions): Promise<VirtualAirline|null>;
}

class VirtualAirlineRepoClass extends BaseRepo implements IVirtualAirlineRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.virtualAirline;
        this.bot?.log.info('VirtualAirlineRepo initialized');
    }

}

export const VirtualAirlineRepo = new VirtualAirlineRepoClass();

