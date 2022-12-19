import { eachOfSeries } from "async";
import { IBotContext, IFlightProcessor,} from "interfaces";
import { FlightRepo } from "../repos";
import { TranslatedFlight, Flight } from "../types";
import { Flight as OnAirFlight } from "onair-api";
import BaseProcessor from "./BaseProcessor";

export class FlightProcessor extends BaseProcessor implements IFlightProcessor {
    Flight: Flight|undefined;
    declare Translated: TranslatedFlight|undefined;
    declare Input: OnAirFlight|undefined;

    constructor(input: OnAirFlight, app: IBotContext) {
        super(app);
        this.Input = input;
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');

        this.process = this.process.bind(this);
    }

    // process Flight
    async processFlight(): Promise<Flight> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('Flight wasn\'t able to be processed'));

            try {
                let translated:TranslatedFlight = self.Translators.Flight.translate(this.Input);
                if (!translated) return reject(new Error('Flight wasn\'t able to be translated'));

                let flight:Flight = await FlightRepo.findById(translated.Id);

                if (!flight) {
                    flight = await FlightRepo.create(translated);
                } else {
                    flight = await FlightRepo.update(translated.Id, translated);
                }

                if (!flight) return reject(new Error('Flight isn\'t able to be processed'));

                self.Flight = flight;

                return resolve(flight);
            }
            catch (err) {
                console.error(`FlightProcessor()::err`, err);
                return reject(err);
            }
        })
    }

    process(): Promise<Flight> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));

            self.processFlight()
            .then((flight:Flight) => {
                if (!flight || !self.Flight) return reject(new Error('No Flight was processed'));
                return resolve(self.Flight);
            })
            .catch((err) => {
                let msg = `FlightProcessor::process::err`
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

// export const FlightProcessor = new FlightProcessor();
