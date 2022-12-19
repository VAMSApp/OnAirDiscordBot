import { OnAirFlightResponse, TranslatedFlight, Flight, } from "../types";
import { IProcessor } from ".";
import { Flight as OnAirFlight } from "onair-api";

export interface IFlightProcessor extends IProcessor {
    Input: OnAirFlight|undefined;
    Translated: TranslatedFlight|undefined;
    Flight: Flight|undefined;
}
