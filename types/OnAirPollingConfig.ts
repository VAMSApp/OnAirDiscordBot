import { ScheduleOptions } from "node-cron";

export type OnAirPollingConfig = {
    enabled: boolean;
    cron: string;
    opts?: ScheduleOptions;
}
