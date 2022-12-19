import { TranslatedEmployee, TranslatorOptions } from "../types";
import { ITranslator } from ".";
import { People as OnAirEmployee } from 'onair-api'

export interface IEmployeeTranslator extends ITranslator {
    Input:OnAirEmployee;
    Translated:TranslatedEmployee|undefined;
    translate(input:OnAirEmployee, opts?:TranslatorOptions): TranslatedEmployee
}
