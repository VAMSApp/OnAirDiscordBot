import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message } from "discord.js";
import { OnAirFbo } from "@/types";
import BaseRefresher, { IRefresher } from "./BaseRefresher";
import { TextChannel } from "discord.js";
import { IBot } from "@/interfaces";
import { FormatTimeInterval } from "@/utils";
import { FBOList } from "@/messages";
import { channel } from "diagnostics_channel";

export class FBOsRefresher extends BaseRefresher<OnAirFbo> implements IRefresher<OnAirFbo> {
    private data: OnAirFbo[] = [];
    private channel!: TextChannel;
    private lastMessage: Message | undefined = undefined;

    constructor(bot: IBot) {
        super('fbos', bot);
    }

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
            this.log.error(`${this.constructor.name}::Unable to find channel with id ${this.status.channelId}`);
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

    public async refresh(): Promise<void> {
        if (this.getOpMode() === 'VA') {
            this.data = await this.bot.OnAir.getVAFBOs();
        } else {
            this.data = await this.bot.OnAir.getCompanyFBOs();
        }

        // Execute immediately
        await this.updateStatusChannel();
    }

    public async updateStatusChannel(): Promise<void> {
        // Get the last message in the channel
        const messages = await this.channel.messages.fetch({ limit: 1 });
        this.lastMessage = messages.first();


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
        const slicedFBOs = this.data.slice((page - 1) * perPage, page * perPage);
        const totalPages = Math.ceil(this.data.length / perPage);
        
        const fboList = FBOList(slicedFBOs);

        if (this.data.length <= 0) {
            msg += `The ${this.getOpMode()} does not currently own any FBOs.`;
        } else if (this.data.length == 1) {
            msg += `The ${this.getOpMode()} owns ${this.data.length} FBO.`;
        } else {
            msg += `The ${this.getOpMode()} owns ${this.data.length} FBOs.`;
        }

        // Only show page information if there's more than one page
        if (totalPages > 1) {
            msg += ` (Page ${page} of ${totalPages})`;
        }
        msg += fboList;
        msg = this.addStatusFooter(msg, this.status);
        
        return `\`\`\`\n${msg}\`\`\``;
    }
}