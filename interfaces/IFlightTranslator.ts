import { OnAirFlightResponse, TranslatedFlight, TranslatorOptions } from "../types";
import { ITranslator } from ".";

export interface IFlightTranslator extends ITranslator {
    Input:OnAirFlightResponse;
    Translated:TranslatedFlight|undefined;
    translate(input:OnAirFlightResponse, opts?:TranslatorOptions): TranslatedFlight
}
