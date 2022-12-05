import { ILogger, IOnAir } from ".";

export interface IBotContext{
    log: ILogger;
    client?: any;
}
