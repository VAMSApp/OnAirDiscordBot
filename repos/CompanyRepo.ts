/* eslint-disable @typescript-eslint/no-this-alias */
import { Prisma, Company } from '@prisma/client';
import { TranslatedCompany, QueryOptions, } from '../types';
import BaseRepo from './BaseRepo';

export interface ICompanyRepo {
    findByAirlineCode(Identifier:string, opts:QueryOptions): Promise<Company>;
    create(newX:Prisma.CompanyCreateInput, opts?:QueryOptions): Promise<Company>;
    update(Id:string, x:Prisma.CompanyUpdateInput, opts?:QueryOptions): Promise<Company>;
}

class CompanyRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.company;
        this.bot?.log.info('CompanyRepo initialized');
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findByAirlineCode = this.findByAirlineCode.bind(this);
    }

    async create(newX:Prisma.CompanyCreateInput, opts?:QueryOptions) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            };
        }

        const query:Prisma.CompanyCreateArgs = {
            data: newX,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.prisma.company.create(query)
            .then((x:Company) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Company) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Company) => (x && opts?.serialize) ? self.serialize(x) : x);
    }

    async update(Id:string, x:TranslatedCompany, opts?:QueryOptions) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            };
        }

        const data:Prisma.CompanyUpdateInput = x as Prisma.CompanyUpdateInput;

        const query:Prisma.CompanyUpdateArgs = {
            where: {
                Id: Id,
            },
            data: data,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.update(query)
            .then((x:Company) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Company) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Company) => (x && opts?.serialize) ? self.serialize(x) : x);
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
        };

        return await this.Model.findUnique(query)
            .then((x:Company) => self.determineCanSync(x))
            .then((x:Company) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Company) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Company) => (x && opts?.serialize) ? self.serialize(x) : x);
    }
    
}

export const CompanyRepo = new CompanyRepoClass();

