// Company or VA details refresher

import { OnAirAircraft, OnAirCompany, OnAirCompanyDetail, OnAirEmployee, OnAirFlight, OnAirMember, OnAirStatusType, OnAirVirtualAirline, OnAirVirtualAirlineDetail } from "@/types";
import BaseRefresher, { IRefresher } from "./BaseRefresher";
import { Message, TextChannel } from "discord.js";
import { IBot } from "@/interfaces";
import { FormatTimeInterval } from "@/utils";
import { VADetail } from "@/messages";
import { CompanyDetail } from "@/messages";

export class DetailRefresher extends BaseRefresher<OnAirCompany|OnAirVirtualAirline> implements IRefresher<OnAirCompany|OnAirVirtualAirline> {
    private data: OnAirCompanyDetail|OnAirVirtualAirlineDetail|undefined = undefined;
    private channel!: TextChannel;
    private lastMessage: Message | undefined = undefined;

    constructor(bot: IBot) {
        super('detail', bot);
    }

    // start the refresh and schedule the interval
    public async start(): Promise<void> {
        // check if the status config is missing
        if (!this.status) {
            this.log.debug(`${this.constructor.name} skipping, ${this.refreshKey} status config is missing. Check the config.ts file.`);
            return;
        }

        // check if the status is disabled
        if (!this.status.enabled) {
            this.log.debug(`${this.constructor.name} skipping, ${this.refreshKey} status is disabled`);
            return;
        }

        // check if the status channel ID is missing
        if (!this.status.channelId) {
            this.log.error(`${this.constructor.name} status channel ID not found in config, aborting refresh.`);
            return;
        }

        // get the status channel
        const channel: TextChannel | null = await this.bot.getChannel(this.status.channelId) as TextChannel | null;

        // check if the status channel is found
        if (!channel) {
            this.log.error(`${this.constructor.name} Unable to find channel with id ${this.status.channelId}`);
            return;
        }

        // set the status channel
        this.channel = channel;

        // log the refresh start
        this.log.info(`${this.constructor.name} ${this.refreshKey} refresh enabled. Starting the first refresh now, future refreshes will run every ${FormatTimeInterval(this.refreshInterval)}.`);

        // refresh the data
        await this.refresh();

        // log the refresh completion
        this.log.info(`${this.constructor.name} ${this.refreshKey} refresh completed.`);

        // schedule the next refresh
        setInterval(() => this.refresh(), this.refreshInterval);
    }

    // refresh the data
    public async refresh(): Promise<void> {
        let x: OnAirCompanyDetail|OnAirVirtualAirlineDetail|undefined = undefined;
        let detail: OnAirCompany|OnAirVirtualAirline|undefined = undefined;
        let fleet:OnAirAircraft[] = [];
        let flights:OnAirFlight[] = [];
        let members:OnAirMember[] = [];
        let employees:OnAirEmployee[] = [];

        // Get the detail for the company or VA
        if (this.config.opMode === 'Company') {
            detail = await this.bot.OnAir.getCompanyDetail();
            fleet = await this.bot.OnAir.getCompanyFleet();
            flights = await this.bot.OnAir.getCompanyFlights();
            employees = await this.bot.OnAir.getCompanyEmployees();

            const flightHours:number = flights.reduce((a:number, b:OnAirFlight) => {
                if (b.AirborneTime) {
                    return a + parseFloat(b.AirborneTime);
                }
    
                return a;
            }, 0);
            
            x = {
                ...detail,
                EmployeeCount: employees.length,
                Employees: employees,
                FleetCount: fleet.length || 0,
                FlightCount: flights.length || 0,
                FlightHours: flightHours,
            }

        } else {
            detail = await this.bot.OnAir.getVADetail();
            fleet = await this.bot.OnAir.getVAFleet();
            flights = await this.bot.OnAir.getVAFlights();
            members = await this.bot.OnAir.getVAMembers();
        
            const flightHours:number = flights.reduce((a:number, b:OnAirFlight) => {
                if (b.AirborneTime) {
                    return a + parseFloat(b.AirborneTime);
                }
    
                return a;
            }, 0);

            x = {
                ...detail,
                MemberCount: members.length,
                Members: members,
                FleetCount: fleet.length || 0,
                FlightCount: flights.length || 0,
                FlightHours: flightHours,
            }
        }

        this.data = x;

        // Execute immediately
        await this.updateStatusChannel();
    }

    // update the status channel
    public async updateStatusChannel(): Promise<void> {
        const messages = await this.channel.messages.fetch({ limit: 1 });
        this.lastMessage = messages.first();

        let msg = '';

        // Get the detail for the company or VA
        if (!this.data) {
            msg += 'There is no company detail available.';

            if (this.lastMessage) {
                await this.lastMessage.edit(msg);
            } else {
                await this.channel.send(msg);
            }

            return;
        }
        
        const content = this.generatePageContent(1);

        // If there's a last message, edit it. Otherwise, send a new message
        if (this.lastMessage) {
            await this.lastMessage.edit(content);
        } else {
            await this.channel.send(content);
        }

        return;
    }
    
    public addStatusFooter(msg: string, { interval }: OnAirStatusType): string {
        // add a footer with the date and time the message was sent

        // delete the last line of the msg if it matches the following "```"
        if (msg.endsWith('```')) {
            msg = msg.slice(0, -3);
        }

        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' } as Intl.DateTimeFormatOptions;
        const dateTimeString = date.toLocaleDateString('en-US', options).replace(', ', ' ');

        let msgInterval = `Every ${FormatTimeInterval(interval*1000)}`;
        msg += '----';
        msg += `\nLast refreshed: ${dateTimeString} (UTC)`;
        msg += `\nRefresh interval: ${msgInterval}`;

        msg += '```';
        return msg;
    }

    public generatePageContent(page: number): string {
        let msg = '';

        if (this.config.opMode === 'Company') {
            msg = CompanyDetail(this.data as OnAirCompanyDetail) || '';

        } else {
            msg = VADetail(this.data as OnAirVirtualAirlineDetail) || '';
        }

        msg = this.addStatusFooter(msg, this.status);
        return msg;
    }
}