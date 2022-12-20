import { Prisma } from '@prisma/client'
import { Account, NewAccount, QueryOptions } from '../types'
import BaseRepo from './BaseRepo'

export interface IAccountRepo {
    findByDiscordId(DiscordId:string, opts:any): Promise<Account>;
    toggleField(Id: string, fieldKey:string, opts?:QueryOptions): Promise<Account>;
    create(newX:any, opts?:QueryOptions): Promise<Account>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<Account>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<Account>;
    findAll(opts?:QueryOptions): Promise<Account[]>;
    findById(Id:any, opts?:QueryOptions): Promise<Account>;
    findFirst(opts?:QueryOptions): Promise<Account>;
}

class AccountRepoClass extends BaseRepo implements IAccountRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.account
        this.bot?.log.info('AccountRepo initialized');

        this.findByDiscordId = this.findByDiscordId.bind(this)
        this.toggleField = this.toggleField.bind(this)
        this.upsert = this.upsert.bind(this)
    }

    async findByDiscordId(DiscordId:string, opts?:QueryOptions) {
        const self = this;
        if (!DiscordId) throw new Error('Discord ID is required');

        const query = {
            where: {
                DiscordId: DiscordId,
            },
            include: (opts?.include) ? opts.include : undefined,
        }

        return this.Model.findUnique(query)
            .then((x:Account) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Account) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Account) => (opts?.serialize) ? self.serialize(x) : x)
    }

    async toggleField(Id:string, fieldKey:string, opts?:QueryOptions) {
        const self = this;
        const x = await this.findById(Id);

        if (!x) {
            throw new Error('Account not found');
        }

        x[fieldKey] = !x[fieldKey];

        return await this.update(x.Id, x)
    }

    async create(newX:NewAccount, opts?:QueryOptions) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        if (self.IsSyncable === true) {
            newX = {
                ...newX,
            }
        }

        const query:Prisma.AccountCreateArgs = {
            data: newX as Prisma.AccountCreateInput,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
            .then((x:Account) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Account) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Account) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async upsert(DiscordId:string, payload:Account, opts?:QueryOptions) {
        const self = this;
        if (!DiscordId) throw new Error('Discord ID is required');
        if (!payload) throw new Error('Payload is required');

        const query = {
            where: {
                DiscordId,
            },
            update: {
                Username: payload.Username,
                Email: payload.Email,
                Locale: payload.Locale,
                Verified: payload.Verified,
                IsAdmin: payload.IsAdmin,
                IsEnabled: payload.IsEnabled,
                LastLogin: payload.LastLogin,
                UpdatedAt: payload.UpdatedAt,
            },
            create: {
                DiscordId: payload.DiscordId,
                Username: payload.Username,
                Discriminator: payload.Discriminator,
                Email: payload.Email,
                Locale: payload.Locale,
                Verified: payload.Verified,
                IsAdmin: payload.IsAdmin,
                IsEnabled: payload.IsEnabled,
                LastLogin: payload.LastLogin,
                UpdatedAt: payload.UpdatedAt,
            },
            include: (opts?.include) ? opts.include : undefined,
        }

        const x = await this.Model.upsert(query)
            .then((x:Account) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:Account) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:Account) => (opts?.serialize) ? self.serialize(x) : x)
            .catch((err:any) => console.error(err))

        return x;
    }
}

export const AccountRepo = new AccountRepoClass();

