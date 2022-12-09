import { OnAirAircraftResponse, TranslatedAircraft, AircraftType, AircraftClass, AircraftEngine, Aircraft, } from "../types";
import { IProcessor } from ".";
import { Aircraft as OnAirAircraft } from "onair-api";

export interface IAircraftProcessor extends IProcessor {
    Input: OnAirAircraft|undefined;
    Translated: TranslatedAircraft|undefined;
    AircraftClass: AircraftClass|undefined;
    AircraftType: AircraftType|undefined;
    AircraftEngines: AircraftEngine[];
    Aircraft: Aircraft|undefined;
}
