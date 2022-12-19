import { IBot } from "../interfaces";
import { OnAirRefreshResults, Processing, Schedule } from "../types";
import { FormatDate } from "../utils";

const schedule:Schedule = {
    name: 'Notifications',
    description: 'refresh the latest VA Notifications',
    async execute ({ config, log, client, OnAir}:IBot) {
        const key = this.name as keyof Processing;
        if (OnAir.Processing[key] === true) return;

        log.info(`Schedule::execute - ${this.description}`);

        const {
            results,
            updated,
            created,
            error,
            success,
            count,
        }:OnAirRefreshResults = await OnAir.refreshVANotifications();
        const formattedDate = FormatDate(new Date())
        const description = this.description.replace('refresh', 'refreshed');

        log.info(`Schedule::execute - ${description} has completed refreshing ${count} records at ${formattedDate}`);
        
    }
}

export default schedule
