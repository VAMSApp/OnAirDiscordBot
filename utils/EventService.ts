import { IBot, ILogger } from 'interfaces';
import Redis, { RedisOptions } from 'ioredis';
import { OnAirEvent } from 'types';

export interface IEventService {
    publish(event: string, data: any): Promise<void>;
    subscribe(event: string, callback: (data: any) => void): Promise<void>;
}

export class EventService implements IEventService {
    private cfg: RedisOptions;
    protected log: ILogger;
    private redis: Redis;
    protected sub: Redis;
    protected pub: Redis;

    constructor(cfg:RedisOptions, app:IBot) {
        this.cfg = cfg;
        this.log = app.log;

        this.redis = new Redis(this.cfg);
        this.sub = new Redis(this.cfg);
        this.pub = new Redis(this.cfg);
    }
    
    async publish(event: string, data: OnAirEvent): Promise<void> {
        this.log.debug(`EventService::publish::Publishing ${event} event. Data: ${JSON.stringify(data)}`)
        await this.pub.publish(event, JSON.stringify(data))
        this.log.debug(`EventService::publish::Published ${event} event`)
    }
    
    async subscribe(event: string, callback: (data: OnAirEvent) => void): Promise<void> {
        const self = this;
        await self.sub.subscribe(event)
        self.log.debug(`EventService::subscribe::Subscribed to ${event} events`)
        self.sub.on('message', (channel, message) => {
            self.log.debug(`EventService::subscribe::Received event on channel '${channel}'. Message: ${message}`)
            callback(JSON.parse(message))
        })
    }
    
}
