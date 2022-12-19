import { TranslatedVARole, VARole, } from "../types";
import { IProcessor } from ".";
import { VARole as OnAirVARole } from "onair-api";

export interface IVARoleProcessor extends IProcessor {
    Input: OnAirVARole|undefined;
    Translated: TranslatedVARole|undefined;
    VARole: VARole|undefined;
}
