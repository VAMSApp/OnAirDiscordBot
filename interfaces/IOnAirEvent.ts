import { OnAirEvent } from "types";
import { IBot } from ".";

export interface IOnAirEvent {
    name: string;
    eventName: string;
    execute: (channelName:string, data:OnAirEvent, discord:IBot) => void;
}
