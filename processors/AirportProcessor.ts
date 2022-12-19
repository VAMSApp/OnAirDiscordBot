import { eachOfSeries } from "async";
import { IBotContext, IAirportProcessor, } from "interfaces";
import { AirportRepo, } from "../repos";
import { Airport, TranslatedAirport, OnAirRefreshResults, QueryOptions, } from "../types";
import { Airport as OnAirAirport, } from "onair-api";

import { BaseProcessor } from "./BaseProcessor";
import { VirtualAirline } from "@prisma/client";

export type ProcessorOptions = {
    translate?:boolean;
    refresh?:boolean;
    create?:boolean;
    update?:boolean;
    include?:any;
    serialize?:boolean;
    humanize?:string[];
    orderBy?:string[];
    omit?:string[];
}

export class AirportProcessor extends BaseProcessor implements IAirportProcessor {
    Airport: Airport|undefined;
    declare Translated: TranslatedAirport|undefined;
    declare Input: OnAirAirport|undefined;

    constructor(input:OnAirAirport|undefined, app: IBotContext) {
        super(app);
        if (input) {
            this.Input = input;
        }
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');
        this.process = this.process.bind(this);
        this.processICAO = this.processICAO.bind(this);
    }

    process(opts?:ProcessorOptions): Promise<Airport> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));

            self
            .processAirport(opts)
            .then(async () => {
                if (!self.Airport) return reject(new Error('No airport processed'));

                self.Logger.debug(`AirportProcessor::process::airport::resolve::start`)

                const queryOpts:QueryOptions = {
                    ...opts,
                    include: {
                        CurrentAircraft: true,
                        HomeAircraft: true,
                        CurrentCharters: true,
                        DepartingCharters: true,
                        ArrivingCharters: true,
                        CurrentCargo: true,
                        DepartingCargo: true,
                        ArrivingCargo: true,
                        MainJobs: true,
                        BaseJobs: true,
                        FerryDepartures: true,
                        FerryArrivals: true,
                        ...opts?.include,
                    }
                }

                const airport:Airport = await AirportRepo.findById(self.Airport.Id, queryOpts);

                self.Logger.debug(`AirportProcessor::process::airport::resolve::end`);

                if (!airport) throw new Error('Airport wasn\'t able to be found');
                self.Airport = airport;

                return resolve(self.Airport)
            })
            .catch((err:any) => {
                let msg = `Error processing airport`
                if (err) {
                    const { error, record } = err;
                    const errorMessage = error instanceof Error ? error.message : error;
                    msg += ` err: ${errorMessage}`;
                }
                
                this.Logger.error(msg);
                return reject(err)
            });
        });
    }

    processICAO(icao:string, opts?:ProcessorOptions): Promise<Airport> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!icao) return reject(new Error('No ICAO provided'));

            // first check if the airport exists in the database by ICAO
            let airport:Airport = await AirportRepo.findByICAO(icao);

            // if no airport exists
            if (!airport) {
                const oaAirport:OnAirAirport = await self.App.OnAir.getAirportByICAO(icao) as OnAirAirport;
                if (!oaAirport) return reject(new Error(`AirportProcessor::processICAO() - OnAir Airport ${icao} wasn't found.`));

                self.Input = oaAirport;

                self.process(opts)
                .then((airport:Airport) => {
                    return resolve(airport);
                })
                .catch((err:any) => {
                    return reject(err);
                });
            } else {
                return resolve(airport);
            }
        });
    }

    // process Airport
    async processAirport(opts?:ProcessorOptions): Promise<Airport> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('Airport wasn\'t able to be processed'));

            try {
                const x:OnAirAirport = this.Input;
                let airport:Airport|undefined;
                let oaAirport:OnAirAirport|undefined;
                let translated:TranslatedAirport|undefined;

                // if refresh is true, get the latest airport data from OnAir
                if (opts?.refresh) {
                    oaAirport = await self.App.OnAir.getAirportByICAO(x.ICAO) as OnAirAirport;
                    if (!oaAirport) return reject(new Error(`OnAir Airport ${x.ICAO} wasn't found.`));
                }

                // if translate is true, translate the OnAir airport or the input airport
                if (opts?.translate) {
                    const preTranslateInput = oaAirport || x;
                    translated = self.Translators.Airport.translate(preTranslateInput);
                    if (!translated) return reject(new Error(`OnAir Airport ${x.ICAO} wasn't able to be translated.`));
                }
                
                // first check if the airport exists in the database by Id
                airport = await AirportRepo.findById(x.Id);
                
                // if no airport exists
                if (!airport) {
                    // if create is true, create the airport
                    if (opts?.create) {
                        // if translate is true, create the translated airport
                        const createInput:TranslatedAirport|undefined = translated;
                        if (!createInput) return reject(new Error(`OnAir Airport ${x.ICAO} wasn't able to be created.`));
                        airport = await AirportRepo.create(createInput);
                    }
                } else {
                    // if update is true, update the airport
                    if (opts?.update) {
                        // if translate is true, update the translated airport
                        const updateInput:TranslatedAirport|undefined = translated;
                        if (!updateInput) return reject(new Error(`OnAir Airport ${x.ICAO} wasn't able to be updated.`));
                        airport = await AirportRepo.update(airport.Id, updateInput);
                    }
                }
                
                if (!airport) return reject(new Error(`OnAir Airport ${x.ICAO} wasn't able to be processed.`));

                self.Airport = airport;

                return resolve(airport);
            }
            catch (err) {
                console.error(`AirportProcessor()::err`, err);
                return reject(err);
            }
        })
    }

}

// export const AirportProcessor = new AirportProcessor();
