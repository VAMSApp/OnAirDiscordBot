import { OnAirAircraftEngineResponse, TranslatedAircraftEngine, TranslatorOptions } from "../types";
import { ITranslator } from ".";

export interface IAircraftEngineTranslator extends ITranslator {
    Input:OnAirAircraftEngineResponse;
    Translated:TranslatedAircraftEngine|undefined;
    translate(input:OnAirAircraftEngineResponse, opts?:TranslatorOptions): TranslatedAircraftEngine
}
