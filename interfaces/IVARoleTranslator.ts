import { TranslatedVARole, TranslatorOptions } from "../types";
import { ITranslator } from ".";
import { VARole as OnAirVARole } from 'onair-api'

export interface IVARoleTranslator extends ITranslator {
    Input:OnAirVARole;
    Translated:TranslatedVARole|undefined;
    translate(input:OnAirVARole, opts?:TranslatorOptions): TranslatedVARole
}
