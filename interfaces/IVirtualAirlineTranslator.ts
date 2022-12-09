import { OnAirVirtualAirlineResponse, TranslatedVirtualAirline, TranslatorOptions } from "../types";
import { ITranslator } from ".";

export interface IVirtualAirlineTranslator extends ITranslator {
    Input:OnAirVirtualAirlineResponse;
    Translated:TranslatedVirtualAirline|undefined;
    translate(input:OnAirVirtualAirlineResponse, opts?:TranslatorOptions): TranslatedVirtualAirline
}
