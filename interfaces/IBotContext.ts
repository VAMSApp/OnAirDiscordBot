import { BotConfig } from "../types";
import { ILogger, IOnAir } from ".";

export interface IBotContext {
    config: BotConfig;
    log: ILogger;
    client?: any;
    OnAir:  IOnAir;
}
