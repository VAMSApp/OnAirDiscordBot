import { Prisma, Employee } from '@prisma/client';
import { QueryOptions } from '../types';
import BaseRepo from './BaseRepo';

export interface IEmployeeRepo {
    create(newX:Prisma.EmployeeCreateInput, opts?:QueryOptions): Promise<Employee>;
    update(Id:string, x:Prisma.EmployeeUpdateInput, opts?:QueryOptions): Promise<Employee>;
    findAll(opts?:QueryOptions): Promise<Employee[]>;
    findById(Id:string, opts?:QueryOptions): Promise<Employee>;
    findFirst(opts?:QueryOptions): Promise<Employee>;
}

class EmployeeRepoClass extends BaseRepo implements IEmployeeRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.employee;
        this.bot?.log.info('EmployeeRepo initialized');
    }
    
    async create(newX:Prisma.EmployeeCreateInput, opts?:QueryOptions) {
        if (!newX) throw new Error('New Record is required');

        const query:Prisma.EmployeeCreateArgs = {
            data: newX as Prisma.EmployeeCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.create(query)
            .then((x:Employee) => (x && opts?.omit) ? this.omit(x, opts.omit) : x)
            .then((x:Employee) => (x && opts?.humanize) ? this.humanize(x, opts.humanize) : x)
            .then((x:Employee) => (x && opts?.serialize) ? this.serialize(x) : x);
    }

    async update(Id:string, x:Prisma.EmployeeUpdateInput, opts?:QueryOptions) {
        if (!x) throw new Error('New Record is required');

        const query:Prisma.EmployeeUpdateArgs = {
            where: {
                Id: Id,
            },
            data: x as Prisma.EmployeeUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        };

        return await this.Model.update(query)
            .then((x:Employee) => (x && opts?.omit) ? this.omit(x, opts.omit) : x)
            .then((x:Employee) => (x && opts?.humanize) ? this.humanize(x, opts.humanize) : x)
            .then((x:Employee) => (x && opts?.serialize) ? this.serialize(x) : x);
    }
}

export const EmployeeRepo = new EmployeeRepoClass();

