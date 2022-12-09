import { TranslatedAircraftType, TranslatorOptions } from "../types";
import { ITranslator } from ".";
import { AircraftType as OnAirAircraftType } from "onair-api";

export interface IAircraftTypeTranslator extends ITranslator {
    Input:OnAirAircraftType;
    Translated:TranslatedAircraftType|undefined;
    translate(input:OnAirAircraftType, opts?:TranslatorOptions): TranslatedAircraftType
}
