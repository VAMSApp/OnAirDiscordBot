import { OnAirAircraftClassResponse, TranslatedAircraftClass, TranslatorOptions } from "../types";
import { ITranslator } from ".";

export interface IAircraftClassTranslator extends ITranslator {
    Input:OnAirAircraftClassResponse;
    Translated:TranslatedAircraftClass|undefined;
    translate(input:OnAirAircraftClassResponse, opts?:TranslatorOptions): TranslatedAircraftClass
}
