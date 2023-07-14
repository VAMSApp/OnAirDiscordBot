import { Prisma, World, } from '@prisma/client';
import { QueryOptions } from '../types';
import BaseRepo from './BaseRepo';

export interface IWorldRepo {
    create(newX:Prisma.WorldCreateInput, opts?:QueryOptions): Promise<World>;
    update(Id:string, x:Prisma.WorldUpdateInput, opts?:QueryOptions): Promise<World>;
    findAll(opts?:QueryOptions): Promise<World[]>;
    findById(Id:string, opts?:QueryOptions): Promise<World>;
    findFirst(opts?:QueryOptions): Promise<World>;
}

class WorldRepoClass extends BaseRepo implements IWorldRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.world;
        this.bot?.log.info('WorldRepo initialized');
    }
    
    async create(newX:Prisma.WorldCreateInput, opts?:QueryOptions) {
        if (!newX) throw new Error('New Record is required');

        const query:Prisma.WorldCreateArgs = {
            data: newX as Prisma.WorldCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.create(query)
            .then((x:World) => (x && opts?.omit) ? this.omit(x, opts.omit) : x)
            .then((x:World) => (x && opts?.humanize) ? this.humanize(x, opts.humanize) : x)
            .then((x:World) => (x && opts?.serialize) ? this.serialize(x) : x);
    }

    async update(Id:string, x:Prisma.WorldUpdateInput, opts?:QueryOptions) {
        if (!x) throw new Error('New Record is required');

        const query:Prisma.WorldUpdateArgs = {
            where: {
                Id: Id,
            },
            data: x as Prisma.WorldUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.update(query)
            .then((x:World) => (x && opts?.omit) ? this.omit(x, opts.omit) : x)
            .then((x:World) => (x && opts?.humanize) ? this.humanize(x, opts.humanize) : x)
            .then((x:World) => (x && opts?.serialize) ? this.serialize(x) : x);
    }
}

export const WorldRepo = new WorldRepoClass();
