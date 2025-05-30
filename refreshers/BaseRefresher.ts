import { IBot, ILogger } from '@/interfaces';
import { OnAirConfig, OnAirStatus, OnAirStatusType, } from '@/types';
import { FormatTimeInterval } from '@/utils/HumanizeDate';


export interface IRefresher<T> {
    refreshInterval: number;
    status: OnAirStatusType;
    refreshKey: keyof OnAirStatus;
    start(): Promise<void>;
    refresh(): Promise<void>;
    updateStatusChannel(): Promise<void>;
    generatePageContent(page: number): string;
    addStatusFooter(msg: string, { interval }: OnAirStatusType): string;
}

abstract class BaseRefresher<T> implements IRefresher<T> {
    protected bot: IBot;
    protected config: OnAirConfig;
    protected log: ILogger;
    public refreshInterval: number;
    public status: OnAirStatusType;
    public refreshKey: keyof OnAirStatus;
    public abstract refresh(): Promise<void>;
    public abstract start(): Promise<void>;
    public abstract updateStatusChannel(): Promise<void>;
    public abstract generatePageContent(page: number): string;
    
    constructor(refreshKey: keyof OnAirStatus, bot: IBot) {
        this.bot = bot;
        this.log = bot.log;
        this.config = bot.config.onair;
        this.status = this.config.status?.[refreshKey] || {} as OnAirStatusType;
        this.refreshInterval = this.status.interval * 1000 || 60000; // Default 1 minute
        this.refreshKey = refreshKey;
        
        this.log.info(`'${this.refreshKey}' will be refreshed every ${FormatTimeInterval(this.refreshInterval)}.`);
    }
    
    public addStatusFooter(msg: string, { interval }: OnAirStatusType): string {
        // add a footer with the date and time the message was sent
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' } as Intl.DateTimeFormatOptions;
        const dateTimeString = date.toLocaleDateString('en-US', options).replace(', ', ' ');

        let msgInterval = `Every ${FormatTimeInterval(interval*1000)}`;
        msg += '\n----';
        msg += `\nLast refreshed: ${dateTimeString} (UTC)`;
        msg += `\nRefresh interval: ${msgInterval}`;

        return msg;
    }

    public getOpMode(): string {
        switch (this.config.opMode) {
            case 'VA':
                return 'VA';
            case 'Company':
                return 'Company';
            default:
                return 'VA';
        }
    }
}

export default BaseRefresher;