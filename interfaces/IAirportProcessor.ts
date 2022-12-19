import { OnAirAirportResponse, TranslatedAirport, Airport, } from "../types";
import { IProcessor } from ".";
import { Airport as OnAirAirport } from "onair-api";

export interface IAirportProcessor extends IProcessor {
    Input: OnAirAirport|undefined;
    Translated: TranslatedAirport|undefined;
    Airport: Airport|undefined;
}
