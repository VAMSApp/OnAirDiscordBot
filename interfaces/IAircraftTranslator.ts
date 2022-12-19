import { OnAirAircraftResponse, TranslatedAircraft, TranslatorOptions } from "../types";
import { ITranslator } from ".";
import { Aircraft as OnAirAircraft, } from 'onair-api'

export interface IAircraftTranslator extends ITranslator {
    Input:OnAirAircraft;
    Translated:TranslatedAircraft|undefined;
    translate(input:OnAirAircraft, opts?:TranslatorOptions): TranslatedAircraft
    translateByOnAirId(onAirId:string, opts?:TranslatorOptions): Promise<TranslatedAircraft>
}
