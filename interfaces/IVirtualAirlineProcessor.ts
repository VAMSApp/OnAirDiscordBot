import { OnAirVirtualAirlineResponse, TranslatedVirtualAirline, VirtualAirline, } from "../types";
import { IProcessor } from ".";

export interface IVirtualAirlineProcessor extends IProcessor {
    Input: OnAirVirtualAirlineResponse|undefined;
    Translated: TranslatedVirtualAirline|undefined;
    VirtualAirline: VirtualAirline|undefined;
}
