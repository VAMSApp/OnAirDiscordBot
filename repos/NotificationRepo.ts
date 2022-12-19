import { Prisma } from '@prisma/client';
import { QueryOptions, Notification, TranslatedNotification } from '../types';
import { Notification as OnAirNotification } from 'onair-api';
import BaseRepo from './BaseRepo'

export interface INotificationRepo {
    create(newX:any, opts?:QueryOptions): Promise<Notification>;
    update(Id:string, x:any, opts?:QueryOptions): Promise<Notification>;
    upsert(Id:string, payload:any, opts?:QueryOptions): Promise<Notification>;
    findAll(opts?:QueryOptions): Promise<Notification[]>;
    findById(Id:string, opts?:QueryOptions): Promise<Notification>;
    findFirst(opts?:QueryOptions): Promise<Notification>;
}

class NotificationRepoClass extends BaseRepo implements INotificationRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.notification
        this.bot?.log.info('NotificationRepo initialized');
        this.findById = this.findById.bind(this);
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

    async create(newX:Prisma.NotificationCreateInput, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (self.IsSyncable === true && !newX.OnAirSyncedAt) {
            newX = {
                ...newX,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.NotificationCreateArgs = {
            data: newX as Prisma.NotificationCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
            .then((x:Notification) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Notification) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Notification) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async update(Id:any, x:Notification, opts?:QueryOptions) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            x = {
                ...x,
                OnAirSyncedAt: new Date(),
            }
        }

        const query:Prisma.NotificationUpdateArgs = {
            where: {
                Id: (typeof Id !== 'string') ? Id.toString() : Id,
            },
            data: x as Prisma.NotificationUpdateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.update(query)
            .then((x:Notification) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Notification) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Notification) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
}

export const NotificationRepo = new NotificationRepoClass();

