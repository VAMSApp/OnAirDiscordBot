import Db from '../db'
import moment from 'moment'
import {  PrismaClient, } from '@prisma/client';
import { IBot } from '../interfaces';
import { QueryOptions } from 'types';

class BaseRepo {
    Model:any
    prisma:PrismaClient = Db;
    IsSyncable = false;
    bot: IBot|undefined;

    constructor() {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.upsert = this.upsert.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.findFirst = this.findFirst.bind(this)
        this.destroy = this.destroy.bind(this);
        this.humanize = this.humanize.bind(this);
        this.serialize = this.serialize.bind(this);
        this.omit = this.omit.bind(this);
        
        if (this.IsSyncable) {
            this.determineCanSync = this.determineCanSync.bind(this);
        }
    }

    public init(bot:IBot) {
        this.bot = bot;
        this.bot.log.info('DBRepo initialized');
    }

    protected determineCanSync (x:any) {
        if (!x) return null;
        let canSync = false;
    
        // if OnAirSyncedAt is not null
        if (x.OnAirSyncedAt) {
            const currentDate = new Date()
            const OnAirSyncedAt = (typeof x.OnAirSyncedAt === 'string') ? new Date(x.OnAirSyncedAt) : x.OnAirSyncedAt;
            const ONE_MIN = 1*60*1000
    
            // if the difference between the current date and the OnAirSyncedAt date is greater than 1 minute
            if ((currentDate.valueOf() - OnAirSyncedAt.valueOf()) > ONE_MIN) {
                canSync = true
            }
        }
    
        return {
            ...x,
            canSync,
        }
    }

    serialize(x:any) {
        if (!x) throw new Error('Record is required');
        let parsedX;
        try {
            parsedX = JSON.parse(JSON.stringify(x));
        }
        catch(e) {
            new Error(`Error parsing JSON ${(e) ? e : ''}`);
            parsedX = x;
        }

        return parsedX
    }

    humanize(x:any, keys:any) {
        if (!x) throw new Error('Record is required');
        if (!keys) throw new Error('Keys are required');

        if (!Array.isArray(keys)) throw new Error('Keys must be an array');
        // if Users is an array
        if (Array.isArray(x)) {
            x.forEach((y) => {
                // loop through keys
                keys.forEach((key) => {
                    // if key exists on y
                    const humanizedDate = (d:any) => {
                        if (!d) throw new Error('Date is required');
                        const h = moment(d).fromNow();
                        return h.toString();
                    }

                    if (y[key]) {
                        // humanize it
                        y[`Humanized_${key}`] = humanizedDate(y[key]);
                    }
                });
            });
        } else {
            // loop through keys
            keys.forEach((key) => {
                // if key exists on user
                if (x[key]) {
                    const humanizedDate = (d:any) => {
                        if (!d) throw new Error('Date is required');
                        const h = moment(d).fromNow();
                        return h.toString();
                    }
                    // humanize it
                    x[`Humanized_${key}`] = humanizedDate(x[key]);
                }
            });
        }
        
        return x;
    };

    omit(_x:any, keys:any) {
        if (!_x) throw new Error('Record is required');
        if (!keys) throw new Error('Keys are required');
        const X = JSON.parse(JSON.stringify(_x));

        if (Array.isArray(X)) {
            X.forEach((x) => {
                keys.forEach((key:any) => {
                    delete x[key];
                });
            });
        } else {
            keys.forEach((key:any) => {
                delete X[key];
            });
        }

        return X;
    }

    async create(newX:any, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            }
        }

        const query = {
            data: newX,
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

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            }
        }

        const query = {
            where: {
                Id: (typeof Id !== 'string') ? Id.toString() : Id,
            },
            data: x,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.update(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async upsert(Id:any, payload:any, opts?:QueryOptions) {
        const self = this;
        if (!Id) throw new Error('Id is required');
        if (!payload) throw new Error('payload is required');

        const query = {
            where: {
                Id: (typeof Id !== 'string') ? Id.toString() : Id,
            },
            update: {
                ...payload,
            },
            create: {
                ...payload,
            },
        }

        return await this.Model.upsert(query)
            .then((x:any) => self.determineCanSync(x))
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findAll(opts?:QueryOptions) {
        const self = this;

        const query = {
            where: undefined,
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findMany(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findById(Id:string, opts?:QueryOptions) {
        const self = this;
        if  (!Id) throw new Error('Id is required');
        
        const query = {
            where: {
                Id: Id,
            },
            include: (opts?.include) ? opts.include : undefined,
        }
        
        const x = await this.Model.findUnique(query)

        return x
    }

    async findFirst(opts?:QueryOptions) {
        const self = this;

        const query = {
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findFirst(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async destroy(Id:any, opts?:QueryOptions) {
        const self = this;
        if (!Id) throw new Error('Id is required');

        const query = {
            where: {
                Id: (typeof Id !== 'string') ? Id.toString() : Id,
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.delete(query)
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
}

export default BaseRepo;
