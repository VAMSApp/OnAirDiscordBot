import { Prisma, OnAirRequest, } from '@prisma/client';
import { QueryOptions } from '../types';
import BaseRepo from './BaseRepo';

export interface IOnAirRequestRepo {
    create(newX:Prisma.OnAirRequestCreateInput, opts?:QueryOptions): Promise<OnAirRequest>;
    update(Id:string, x:Prisma.OnAirRequestUpdateInput, opts?:QueryOptions): Promise<OnAirRequest>;
    findAll(opts?:QueryOptions): Promise<OnAirRequest[]>;
    findById(Id:string, opts?:QueryOptions): Promise<OnAirRequest>;
    findFirst(opts?:QueryOptions): Promise<OnAirRequest>;
}

class OnAirRequestRepoClass extends BaseRepo implements IOnAirRequestRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.onAirRequest;
        this.bot?.log.info('OnAirRequestRepo initialized');
    }
    
    async create(newX:Prisma.OnAirRequestCreateInput, opts?:QueryOptions) {
        if (!newX) throw new Error('New Record is required');

        const query:Prisma.OnAirRequestCreateArgs = {
            data: newX as Prisma.OnAirRequestCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.create(query)
            .then((x:OnAirRequest) => (x && opts?.omit) ? this.omit(x, opts.omit) : x)
            .then((x:OnAirRequest) => (x && opts?.humanize) ? this.humanize(x, opts.humanize) : x)
            .then((x:OnAirRequest) => (x && opts?.serialize) ? this.serialize(x) : x);
    }

    async update(Id:string, x:Prisma.OnAirRequestUpdateInput, opts?:QueryOptions) {
        if (!x) throw new Error('New Record is required');

        const query:Prisma.OnAirRequestUpdateArgs = {
            where: {
                Id: Id,
            },
            data: x as Prisma.OnAirRequestUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.update(query)
            .then((x:OnAirRequest) => (x && opts?.omit) ? this.omit(x, opts.omit) : x)
            .then((x:OnAirRequest) => (x && opts?.humanize) ? this.humanize(x, opts.humanize) : x)
            .then((x:OnAirRequest) => (x && opts?.serialize) ? this.serialize(x) : x);
    }
}

export const OnAirRequestRepo = new OnAirRequestRepoClass();
