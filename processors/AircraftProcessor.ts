import { eachOfSeries } from "async";
import { IBotContext, IAircraftProcessor,} from "interfaces";
import { AircraftClassRepo, AircraftEngineRepo, AircraftRepo, AircraftTypeRepo } from "../repos";
import { Aircraft, AircraftClass, AircraftEngine, AircraftType, TranslatedAircraft, TranslatedAircraftClass, TranslatedAircraftEngine, TranslatedAircraftType, OnAirAircraftResponse, InputResponse, OnAirRefreshResults, OnAirAircraftTypeResponse } from "../types";
import { Aircraft as OnAirAircraft, AircraftType as OnAirAircraftType } from "onair-api";

import BaseProcessor from "./BaseProcessor";

export class AircraftProcessor extends BaseProcessor implements IAircraftProcessor {
    AircraftClass: AircraftClass|undefined;
    AircraftType: AircraftType|undefined;
    AircraftEngines: AircraftEngine[] = [];
    Aircraft: Aircraft|undefined;
    declare Translated: TranslatedAircraft|undefined;
    declare Input: OnAirAircraft|undefined;
    declare Created: boolean|undefined;
    declare Updated: boolean|undefined;

    constructor(input:OnAirAircraft, app: IBotContext) {
        super(app);
        this.Input = input;
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');

        this.process = this.process.bind(this);
    }

    process(): Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));

            self
            .processAircraftClass()
            .then(async () => {
                self.Logger.debug(`AircraftProcessor::process::AircraftType::start`)
                const x:AircraftType = await self.processAircraftType()
                self.Logger.debug(`AircraftProcessor::process::AircraftType::end`)
                return x;
            })
            .then(async () => {
                self.Logger.debug(`AircraftProcessor::process::Aircraft::start`)
                const x:Aircraft = await self.processAircraft()
                self.Logger.debug(`AircraftProcessor::process::Aircraft::end`)
                return x;
            })
            .then(async () => {
                self.Logger.debug(`AircraftProcessor::process::AircraftEngines::start`)
                const x:AircraftEngine[] = await self.processAircraftEngines()
                self.Logger.debug(`AircraftProcessor::process::AircraftEngines::end`)
                return x;
            })
            .then(async () => {
                if (!self.Aircraft) return reject(new Error('No aircraft processed'));

                self.Logger.debug(`AircraftProcessor::process::aircraft::resolve::start`)

                const aircraft:Aircraft = await AircraftRepo.findById(self.Aircraft.Id, {
                    include: {
                        AircraftType: {
                            include: {
                                AircraftClass: true,
                            },
                        },
                        Engines: true,
                        RentalAirport: true,
                        CurrentAirport: true,
                        RentalCompany: true,
                        OwnerCompany: true,
                        CurrentCompany: true,
                        Ferry: true,
                        World: true,
                    }
                });

                self.Logger.debug(`AircraftProcessor::process::aircraft::resolve::end`);

                if (!aircraft) throw new Error('Aircraft wasn\'t able to be found');
                self.Aircraft = aircraft;

                const results:OnAirRefreshResults = {
                    results: self.Aircraft,
                    created: self.Created,
                    updated: self.Updated,
                    success: true,
                }
                return resolve(results)
            })
            .catch((err:any) => {
                let msg = `Error processing aircraft`
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

    // process AircraftClass
    async processAircraftClass(): Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('AircraftClass isn\'t able to be processed'));
            try {
                const aircraftClass = self.Input.AircraftType.AircraftClass;
                let translated:TranslatedAircraftClass = self.Translators.AircraftClass.translate(aircraftClass);
                if (!translated) return reject(new Error('AircraftClass wasn\'t able to be translated'));

                self.AircraftClass = await AircraftClassRepo.findById(translated.Id);
                if (!self.AircraftClass) {
                    self.AircraftClass = await AircraftClassRepo.create({
                        ...translated,
                        OnAirSyncedAt: new Date(),
                    });
                } else {
                    self.AircraftClass = await AircraftClassRepo.update(self.AircraftClass.Id, {
                        ...translated,
                        OnAirSyncedAt: new Date(),
                    });
                }

                if (!self.AircraftClass) return reject(new Error('AircraftClass wasn\'t able to be processed'));
                return resolve();
            }
            catch(err) {
                let msg = `AircraftClassProcessor()::catch`;

                if (err) {
                    const errorMessage = err instanceof Error ? err.message : err;
                    msg += `::errorMessage=${errorMessage}`;
                }

                this.Logger.error(msg);
                return reject(err);
            }
        })
    }

    // process AircraftType
    async processAircraftType(): Promise<AircraftType> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('Aircraft isn\'t able to be processed'));

            try {
                const incomingAircraftType:OnAirAircraftType = self.Input.AircraftType;
                let translated:TranslatedAircraftType = self.Translators.AircraftType.translate(incomingAircraftType);
                if (!translated) return reject(new Error('AircraftType wasn\'t able to be translated'));

                self.AircraftType = await AircraftTypeRepo.findById(translated.Id);
                if (!self.AircraftType) {
                    self.AircraftType = await AircraftTypeRepo.create(translated);
                } else {
                    self.AircraftType = await AircraftTypeRepo.update(self.AircraftType.Id, translated);
                }

                if (!self.AircraftType) return reject(new Error('AircraftType isn\'t able to be processed'));
                return resolve(self.AircraftType);
            }
            catch(err) {
                console.error(`AircraftTypeProcessor()::err`, err);
                return reject(err);
            }
        })
    }

    async processEngine(): Promise<OnAirRefreshResults> {
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('AircraftEngine isn\'t able to be processed'));
        });
    }

    // process Aircraft
    async processAircraft(): Promise<Aircraft> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('Aircraft wasn\'t able to be processed'));

            try {
                const x:OnAirAircraft = this.Input;
                let translated:TranslatedAircraft = self.Translators.Aircraft.translate(x);
                
                if (!translated) return reject(new Error('Aircraft wasn\'t able to be translated'));
                if (!self.AircraftType) return reject(new Error('AircraftType wasn\'t able to be processed'));

                let aircraft:Aircraft = await AircraftRepo.findById(translated.Id);
                
                if (!aircraft) {
                    aircraft = await AircraftRepo.create(translated);
                    self.Created = true;
                } else {
                    aircraft.OnAirSyncedAt = new Date();
                    aircraft = await AircraftRepo.update(translated.Id, translated);
                    self.Updated = true;
                }
                if (!aircraft) return reject(new Error('Aircraft isn\'t able to be processed'));

                self.Aircraft = aircraft;

                return resolve(aircraft);
            }
            catch (err) {
                console.error(`AircraftProcessor()::err`, err);
                return reject(err);
            }
        })
    }

    async processAircraftEngine(e:AircraftEngine): Promise<AircraftEngine> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('AircraftEngine isn\'t able to be processed'));
            let translated:TranslatedAircraftEngine = self.Translators.AircraftEngine.translate(e);
            if (!translated) throw new Error('AircraftEngine wasn\'t able to be translated');

            let engine:AircraftEngine = await AircraftEngineRepo.findById(translated.Id);

            if (!engine) {
                engine = await AircraftEngineRepo.create({
                    ...translated,
                    OnAirSyncedAt: new Date(),
                });
            } else {
                engine = await AircraftEngineRepo.update(engine.Id, {
                    ...translated,
                    OnAirSyncedAt: new Date(),
                });
            }

            if (!engine) return reject(`AircraftEngine '${translated.Id}' wasn't able to be processed`);
            return resolve(engine);
        });
    }

    async processAircraftEngines(): Promise<AircraftEngine[]> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            try {
                if (!self.Input) return reject(new Error('No aircraft response provided'));
                if (!self.Input.Engines) return reject(new Error('No aircraft engines provided'));
                if (!self.Aircraft || self.Aircraft === undefined) return reject(new Error('No aircraft created yet'));

                // loop through the engines
                if (self.Input.Engines.length === 0) return resolve(self.AircraftEngines);

                eachOfSeries(self.Input.Engines, async (e:AircraftEngine) => {
                    const engine = await self.processAircraftEngine(e);
                    if (!engine) return reject(`AircraftEngine '${e.Id}' wasn't able to be processed`);
                    self.AircraftEngines.push(engine);
                    return;
                })
                .then(() => {
                    resolve(self.AircraftEngines)
                })
                .catch((err) => {
                    return reject(err);
                });
            }
            catch (err) {
                let msg = `AircraftProcessor::processAircraftEngines::err`;
                if (err) {
                    msg += ` - ${err}`;
                }

                this.Logger.error(msg);
                return reject(err);
            }
        });
    }
}

// export const AircraftProcessor = new AircraftProcessor();
