import { Prisma } from '@prisma/client';
import { TranslatedCompany, QueryOptions, Company } from '../types';
import BaseRepo from './BaseRepo'

export interface ICompanyRepo {
    findByAirlineCode(Identifier:string, opts:any): Promise<Company>;
    create(newX:any, opts?:QueryOptions): Promise<Company>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<Company>;
}

class CompanyRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.company
        this.bot?.log.info('CompanyRepo initialized');
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findByAirlineCode = this.findByAirlineCode.bind(this)
    }

    async create(newX:TranslatedCompany, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (newX.WorldId) delete newX.WorldId;
        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            }
        }

        
        const data:Prisma.CompanyCreateInput = newX as Prisma.CompanyCreateInput;

        const query:Prisma.CompanyCreateArgs = {
            data: data,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.prisma.company.create(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async update(Id:string, x:TranslatedCompany, opts?:QueryOptions) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            }
        }

        const data:Prisma.CompanyUpdateInput = x as Prisma.CompanyUpdateInput;

        const query:Prisma.CompanyUpdateArgs = {
            where: {
                Id: Id,
            },
            data: data,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.update(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findByAirlineCode(AirlineCode:string, opts?:QueryOptions) {
        const self = this;
        if (!AirlineCode) throw new Error('AirlineCode is required');

        const query = {
            where: {
                AirlineCode: AirlineCode
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findUnique(query)
            .then((x:any) => self.determineCanSync(x))
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
    
}

export const CompanyRepo = new CompanyRepoClass();

