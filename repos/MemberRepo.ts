import { Prisma } from '@prisma/client'
import { Member, TranslatedMember, QueryOptions } from '../types'
import BaseRepo from './BaseRepo'

export interface IMemberRepo {
    create(newX:TranslatedMember, opts?:QueryOptions): Promise<Member>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<Member>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<Member>;
    findAll(opts?:QueryOptions): Promise<Member[]>;
    findById(Id:any, opts?:QueryOptions): Promise<Member>;
    findFirst(opts?:QueryOptions): Promise<Member>;
}

class MemberRepoClass extends BaseRepo implements IMemberRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.member
        this.bot?.log.info('MemberRepo initialized');
    }

    async create(newX:TranslatedMember, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (newX.VaId) delete newX.VaId;
        if (newX.CompanyId) delete newX.CompanyId;
        if (newX.VARoleId) delete newX.VARoleId;

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.MemberCreateArgs = {
            data: newX as Prisma.MemberCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async update(Id:any, x:any, opts?:QueryOptions) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        if (x.VaId) delete x.VaId;
        if (x.CompanyId) delete x.CompanyId;
        if (x.VARoleId) delete x.VARoleId;

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.MemberUpdateArgs = {
            where: {
                Id: (typeof Id !== 'string') ? Id.toString() : Id,
            },
            data: x as Prisma.MemberUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.update(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
}

export const MemberRepo = new MemberRepoClass();

