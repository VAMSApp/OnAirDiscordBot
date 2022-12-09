import { IBot } from "../interfaces";
import { Processing, Schedule, } from "../types";
import { FormatDate } from "../utils";

const schedule:Schedule = {
    name: 'VirtualAirline',
    description: 'refresh the VA Details',
    async execute ({ config, log, client, OnAir}:IBot) {
        const key = this.name as keyof Processing;
        if (OnAir.Processing[key] === true) return;

        log.info(`Schedule::execute::start - ${this.description}`);
        
        const {
            createdAt,
            count,
        } = await OnAir.refreshVirtualAirline();
        const formattedDate = FormatDate(createdAt)
        const description = this.description.replace('refresh', 'refreshed');
        log.info(`Schedule::execute::end - ${description} has completed refreshing ${count} records at ${formattedDate}`);
    }
}
export default schedule
