import { OnAirAirportResponse, TranslatedAirport, TranslatorOptions } from "../types";
import { ITranslator } from ".";

export interface IAirportTranslator extends ITranslator {
    Input:OnAirAirportResponse;
    Translated:TranslatedAirport|undefined;
    translate(input:OnAirAirportResponse, opts?:TranslatorOptions): TranslatedAirport
}
