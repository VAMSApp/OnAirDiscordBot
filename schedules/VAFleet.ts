import { IBot } from "../interfaces";
import { OnAirRefreshResults, Processing, Schedule, } from "../types";
import { FormatDate } from "../utils";

const schedule:Schedule = {
    name: 'VAFleet',
    description: 'refresh the VA Fleet',
    async execute ({ config, log, client, OnAir}:IBot) {
        const key = this.name as keyof Processing;
        if (OnAir.Processing[key] === true) return;

        log.info(`Schedule::execute::start - ${this.description}`);
        const results: OnAirRefreshResults = await OnAir.refreshVAFleet();
        const formattedDate = FormatDate(results.createdAt)
        const description = this.description.replace('refresh', 'refreshed');
        log.info(`Schedule::execute::end - ${description} has completed at ${formattedDate}`);
    }
}

export default schedule;
