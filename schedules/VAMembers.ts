import { IBot } from "../interfaces";
import { OnAirRefreshResults, Processing, Schedule, } from "../types";
import { FormatDate } from "../utils";

const schedule:Schedule = {
    name: 'VAMembers',
    description: 'refresh the current VA Members',
    async execute ({ config, log, client, OnAir}:IBot) {
        const key = this.name as keyof Processing;
        if (OnAir.Processing[key] === true) return;

        log.info(`Schedule::execute::start - ${this.description}`);

        const {
            results,
            updated,
            created,
            error,
            success,
            count,
        }:OnAirRefreshResults = await OnAir.refreshVAMembers();
        const formattedDate = FormatDate(new Date())
        const description = this.description.replace('refresh', 'refreshed');
        log.info(`Schedule::execute::end - ${description} has completed refreshing ${count} records at ${formattedDate}`);
    }
}

export default schedule;
