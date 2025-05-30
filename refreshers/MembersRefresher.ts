import BaseRefresher, { IRefresher } from "./BaseRefresher";
import { OnAirMember } from "@/types";
import { IBot } from "@/interfaces";
import { Channel, Message, TextChannel } from "discord.js";
import { MembersList } from "@/messages";
import { FormatTimeInterval } from "@/utils";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export class MembersRefresher extends BaseRefresher<OnAirMember> implements IRefresher<OnAirMember> {
    private data: OnAirMember[] = [];
    private channel!: TextChannel;
    private lastMessage: Message | undefined = undefined;
    
    constructor(bot: IBot) {
        super('members', bot);
    }

    // start the refresh and schedule the interval
    public async start(): Promise<void> {
        // check if the bot is running in VA mode
        if (this.getOpMode() !== 'VA') {
            this.log.warn(`${this.constructor.name}::refresh() skipping, ${this.refreshKey} status is not enabled for this mode.`);
            let msg = 'Bot is running in Company mode. Member status refresh is not enabled for this mode. Please set the ONAIR_OPERATION_MODE to VA to enable.';
            
            await this.channel.send(`\`\`\`\n${msg}\`\`\``);
            return;
        }

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
        this.data = await this.bot.OnAir.getVAMembers();

        // Execute immediately
        await this.updateStatusChannel();
    }

    // update the status channel
    public async updateStatusChannel(): Promise<void> {
        const messages = await this.channel.messages.fetch({ limit: 1 });
        this.lastMessage = messages.first();

        const initialPage = 1;
        const perPage = this.status.pageSize || 10;
        const totalPages = Math.ceil(this.data.length / perPage);
        const content = this.generatePageContent(initialPage);
        
        // Only create buttons if there's more than one page
        let components: ActionRowBuilder<ButtonBuilder>[] = [];
        if (totalPages > 1) {
            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('first')
                        .setLabel('⏮️ First')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('previous')
                        .setLabel('◀️ Previous')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next ▶️')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('last')
                        .setLabel('Last ⏭️')
                        .setStyle(ButtonStyle.Primary)
                );
            components = [row];
        }

        // If there's a last message, edit it. Otherwise, send a new message
        const message = this.lastMessage ? 
            await this.lastMessage.edit({ content, components }) :
            await this.channel.send({ content, components });

        // Only create collector if there's more than one page
        if (totalPages > 1) {
            const collector = message.createMessageComponentCollector({ 
                time: this.refreshInterval
            });

            let currentPage = initialPage;

            collector.on('collect', async interaction => {
                switch(interaction.customId) {
                    case 'first':
                        currentPage = 1;
                        break;
                    case 'previous':
                        currentPage = Math.max(1, currentPage - 1);
                        break;
                    case 'next':
                        currentPage = Math.min(totalPages, currentPage + 1);
                        break;
                    case 'last':
                        currentPage = totalPages;
                        break;
                }

                await interaction.update({ 
                    content: this.generatePageContent(currentPage),
                    components: components
                });
            });

            collector.on('end', () => {
                // Remove buttons when collector expires
                message.edit({ 
                    content: this.generatePageContent(currentPage),
                    components: [] 
                });
            });
        }
    }

    public generatePageContent(page: number): string {
        let msg = '';
        const perPage = this.status.pageSize || 10;
        const totalPages = Math.ceil(this.data.length / perPage);
        
        // Get sort column from config if specified, default to company name
        const sortColumn = this.status.sortColumn || 'Company';
        
        // Sort members array based on the specified column
        const sortedMembers = this.data.sort((a:OnAirMember, b:OnAirMember) => {
            switch(sortColumn) {
                case 'Role':
                    return a.VARole.Permission - b.VARole.Permission;
                case 'Reputation':
                    return b.Company.Reputation - a.Company.Reputation;
                case 'Flights':
                    return b.NumberOfFlights - a.NumberOfFlights;
                case 'Hours':
                    return b.FlightHours - a.FlightHours;
                case 'LastFlight':
                    return new Date(b.LastVAFlightDate).getTime() - new Date(a.LastVAFlightDate).getTime();
                case 'Pax':
                    return b.TotalPAXsTransported - a.TotalPAXsTransported;
                case 'Cargo':
                    return b.TotalCargosTransportedLbs - a.TotalCargosTransportedLbs;
                case 'Pax & Cargo':
                    const totalA = a.TotalPAXsTransported + a.TotalCargosTransportedLbs;
                    const totalB = b.TotalPAXsTransported + b.TotalCargosTransportedLbs;
                    return totalB - totalA;
                case 'Company':
                case 'Earnings':
                    return b.TotalEarnedCredits - a.TotalEarnedCredits;
                default:
                    return a.Company.Name.localeCompare(b.Company.Name);
            }
        });

        const slicedMembers = sortedMembers.slice((page - 1) * perPage, page * perPage);
        const membersList = MembersList(slicedMembers);

        if (this.data.length <= 0) {
            msg += 'There are no members in the VA.';
        } else if (this.data.length == 1) {
            msg += `There is ${this.data.length} member in the VA. (Sorted by ${sortColumn})`;
        } else {
            msg += `There are ${this.data.length} members in the VA. (Sorted by ${sortColumn})`;
        }

        // Only show page information if there's more than one page
        if (totalPages > 1) {
            msg += ` (Page ${page} of ${totalPages})`;
        }

        msg += membersList;
        msg = this.addStatusFooter(msg, this.status);
        
        return `\`\`\`\n${msg}\`\`\``;
    }
}