import { IBot } from "../interfaces";
import { Processing, Schedule } from "../types";
import { FormatDate } from "../utils";

const schedule:Schedule = {
    name: 'Notifications',
    description: 'refresh the latest VA Notifications',
    async execute ({ config, log, client, OnAir}:IBot) {
        const key = this.name as keyof Processing;
        if (OnAir.Processing[key] === true) return;

        log.info(`Schedule::execute - ${this.description}`);
        const results = await OnAir.refreshVANotifications();
        const formattedDate = FormatDate(results.createdAt)
        const description = this.description.replace('refresh', 'refreshed');
        log.info(`Schedule::execute - ${description} has completed at ${formattedDate}`);
    }
}

export default schedule
