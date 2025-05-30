import { OnAirMember } from "@/types";
import BaseRefresher, { IRefresher } from "./BaseRefresher";
import { OnAirJob } from "@/types";
import { IBot } from "@/interfaces";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, TextChannel } from "discord.js";
import { FormatTimeInterval } from "@/utils";
import { JobsList } from "@/messages";
import { channel } from "diagnostics_channel";

export class JobsRefresher extends BaseRefresher<OnAirJob> implements IRefresher<OnAirJob> {
    private data: OnAirJob[] = [];
    private channel!: TextChannel;
    private lastMessage: Message | undefined = undefined;

    constructor(bot: IBot) {
        super('jobs', bot);
    }

    // start the refresh and schedule the interval
    public async start(): Promise<void> {
        if (!this.status) {
            this.log.debug(`${this.constructor.name} skipping, ${this.refreshKey} status config is missing. Check the config.ts file.`);
            return;
        }

        if (!this.status.enabled) {
            this.log.debug(`${this.constructor.name} skipping, ${this.refreshKey} status is disabled`);
            return;
        }

        if (!this.status.channelId) {
            this.log.error(`${this.constructor.name} status channel ID not found in config, aborting refresh.`);
            return;
        }

        const channel: TextChannel | null = await this.bot.getChannel(this.status.channelId) as TextChannel | null;

        if (!channel) {
            this.log.error(`${this.constructor.name} Unable to find channel with id ${this.status.channelId}`);
            return;
        }

        this.channel = channel;

        this.log.info(`${this.constructor.name} ${this.refreshKey} refresh enabled. Starting the first ${this.refreshKey} refresh now, future refreshes will run every ${FormatTimeInterval(this.refreshInterval)}.`);

        await this.refresh();

        this.log.info(`${this.constructor.name} ${this.refreshKey} refresh completed.`);

        setInterval(() => this.refresh(), this.refreshInterval);
    }

    // refresh the data
    public async refresh(): Promise<void> {
        if (this.getOpMode() === 'VA') {
            this.data = await this.bot.OnAir.getVAJobs();
        } else {
            this.data = await this.bot.OnAir.getCompanyJobs();
        }

        await this.updateStatusChannel();
    }

    // update the status channel with the current page of the jobs
    public async updateStatusChannel(): Promise<void> {
        const messages = await this.channel.messages.fetch({ limit: 1 });
        this.lastMessage = messages.first();
        
        let msg = '';

        const initialPage = 1;
        const totalPages = Math.ceil(this.data.length / (this.status.pageSize || 5));
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
        const perPage = this.status.pageSize || 5;
        const slicedJobs = this.data.slice((page - 1) * perPage, page * perPage);
        const totalPages = Math.ceil(this.data.length / perPage);
        
        const jobList = JobsList(slicedJobs);

        if (this.data.length <= 0) {
            msg += `There are no pending/in-progress jobs in the ${this.config.opMode || 'VA'}.`;
        } else if (this.data.length == 1) {
            msg += `There is ${this.data.length} pending/in-progress job in the ${this.config.opMode || 'VA'}.`;
        } else {
            msg += `There are ${this.data.length} jobs in the ${this.config.opMode || 'VA'}.`;
        }

        // Only show page information if there's more than one page
        if (totalPages > 1) {
            msg += ` (Page ${page} of ${totalPages})`;  
        }

        msg += `\n${jobList}`;
        msg = this.addStatusFooter(msg, this.status);
        
        return `\`\`\`\n${msg}\`\`\``;
    }
}
