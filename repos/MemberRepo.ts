import { Prisma } from '@prisma/client';
import { Member, QueryOptions } from '../types';
import BaseRepo from './BaseRepo';

export interface IMemberRepo {
    create(newX:Prisma.MemberCreateInput, opts?:QueryOptions): Promise<Member>;
    update(Id:string, x:Prisma.MemberUpdateInput, opts?:QueryOptions): Promise<Member>;
    upsert(Id:string, payload:unknown, opts?:QueryOptions): Promise<Member>;
    findAll(opts?:QueryOptions): Promise<Member[]>;
    findById(Id:string, opts?:QueryOptions): Promise<Member>;
    findFirst(opts?:QueryOptions): Promise<Member>;
}

class MemberRepoClass extends BaseRepo implements IMemberRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.member;
        this.bot?.log.info('MemberRepo initialized');
    }

    async create(newX:Prisma.MemberCreateInput, opts?:QueryOptions) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            };
        }

        const query:Prisma.MemberCreateArgs = {
            data: newX as Prisma.MemberCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.create(query)
            .then((x:Member) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Member) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Member) => (x && opts?.serialize) ? self.serialize(x) : x);
    }

    async update(Id:string, x:Prisma.MemberUpdateInput, opts?:QueryOptions) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        if (!x) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            };
        }

        const query:Prisma.MemberUpdateArgs = {
            where: {
                Id: Id,
            },
            data: x as Prisma.MemberUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.update(query)
            .then((x:Member) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Member) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Member) => (x && opts?.serialize) ? self.serialize(x) : x);
    }
}

export const MemberRepo = new MemberRepoClass();

