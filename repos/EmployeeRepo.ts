import { Prisma } from '@prisma/client'
import { Employee, TranslatedEmployee, QueryOptions } from '../types'
import BaseRepo from './BaseRepo'

export interface IEmployeeRepo {
    create(newX:TranslatedEmployee, opts?:QueryOptions): Promise<Employee>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<Employee>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<Employee>;
    findAll(opts?:QueryOptions): Promise<Employee[]>;
    findById(Id:any, opts?:QueryOptions): Promise<Employee>;
    findFirst(opts?:QueryOptions): Promise<Employee>;
}

class EmployeeRepoClass extends BaseRepo implements IEmployeeRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.employee
        this.bot?.log.info('EmployeeRepo initialized');
    }

    async create(newX:TranslatedEmployee, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (newX.CompanyId) delete newX.CompanyId;

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.EmployeeCreateArgs = {
            data: newX as Prisma.EmployeeCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
            .then((x:Employee) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Employee) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Employee) => (x && opts?.serialize) ? self.serialize(x) : x)
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

        const query:Prisma.EmployeeUpdateArgs = {
            where: {
                Id: (typeof Id !== 'string') ? Id.toString() : Id,
            },
            data: x as Prisma.EmployeeUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.update(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
}

export const EmployeeRepo = new EmployeeRepoClass();

