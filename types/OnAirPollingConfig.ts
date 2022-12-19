import { ScheduleOptions } from "node-cron";

export type OnAirPollingConfig = {
    notify?: string[]|string|undefined|boolean;
    enabled: boolean;
    cron: string;
    opts?: ScheduleOptions;
    autoDelete: boolean;
    autoDeleteInterval?: number|undefined;
}
