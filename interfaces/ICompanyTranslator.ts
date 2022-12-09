import { OnAirCompanyResponse, TranslatedCompany, TranslatorOptions } from "../types";
import { ITranslator } from ".";

export interface ICompanyTranslator extends ITranslator {
    Input:OnAirCompanyResponse;
    Translated:TranslatedCompany|undefined;
    translate(input:OnAirCompanyResponse, opts?:TranslatorOptions): TranslatedCompany
}
