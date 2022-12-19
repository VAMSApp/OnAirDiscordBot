import { TranslatedCompany, Company, } from "../types";
import { IProcessor } from ".";
import { Company as OnAirCompany } from "onair-api";

export interface ICompanyProcessor extends IProcessor {
    Input: OnAirCompany|undefined;
    Translated: TranslatedCompany|undefined;
    Company: Company|undefined;
}
