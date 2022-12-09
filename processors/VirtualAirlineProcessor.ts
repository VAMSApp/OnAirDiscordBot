import { eachOfSeries } from "async";
import { IBotContext, IVirtualAirlineProcessor,} from "interfaces";
import { VirtualAirlineRepo } from "../repos";
import { TranslatedVirtualAirline, OnAirVirtualAirlineResponse, VirtualAirline } from "../types";
import BaseProcessor from "./BaseProcessor";

export class VirtualAirlineProcessor extends BaseProcessor implements IVirtualAirlineProcessor {
    VirtualAirline: VirtualAirline|undefined;
    declare Translated: TranslatedVirtualAirline|undefined;
    declare Input: OnAirVirtualAirlineResponse|undefined;

    constructor(input: OnAirVirtualAirlineResponse, app: IBotContext) {
        super(app);
        this.Input = input;
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');

        this.process = this.process.bind(this);
    }

    // process VirtualAirline
    async processVirtualAirline(): Promise<VirtualAirline> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('VirtualAirline wasn\'t able to be processed'));

            try {
                let translated:TranslatedVirtualAirline = self.Translators.VirtualAirline.translate(this.Input);
                if (!translated) return reject(new Error('VirtualAirline wasn\'t able to be translated'));

                let virtualairline:VirtualAirline = await VirtualAirlineRepo.findById(translated.Id);
                
                if (!virtualairline) {
                    if (!translated.ApiKey && self.App.config.onair.keys.apiKey) {
                        translated.ApiKey = self.App.config.onair.keys.apiKey;
                    }

                    if (!translated.ApiKey) return reject(new Error('The OnAir Api Key is missing in config.ts'));
                    virtualairline = await VirtualAirlineRepo.create(translated);
                } else {
                    virtualairline = await VirtualAirlineRepo.update(translated.Id, translated);
                }
                if (!virtualairline) return reject(new Error('VirtualAirline isn\'t able to be processed'));

                self.VirtualAirline = virtualairline;

                return resolve(virtualairline);
            }
            catch (err) {
                console.error(`VirtualAirlineProcessor()::err`, err);
                return reject(err);
            }
        })
    }

    process(): Promise<VirtualAirline> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));

            self.processVirtualAirline()
            .then((virtualAirline:VirtualAirline) => {
                if (!virtualAirline || !self.VirtualAirline) return reject(new Error('No Virtual Airline was processed'));
                return resolve(self.VirtualAirline);
            })
            .catch((err) => {
                let msg = `VirtualAirlineProcessor::process::err`
                if (err) {
                    const { error, record } = err;

                    const errorMessage = error instanceof Error ? error.message : error;
                    msg += ` err: ${errorMessage}`;
                }
                
                self.Logger.error(msg);
                return reject(err)
            });
        });
    }
}

// export const VirtualAirlineProcessor = new VirtualAirlineProcessor();
