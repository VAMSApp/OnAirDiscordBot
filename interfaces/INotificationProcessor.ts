import { TranslatedNotification, Notification, NotificationProcessorOptions, OnAirRefreshResults, } from "../types";
import { IProcessor } from ".";
import { Notification as OnAirNotification } from "onair-api";

export interface INotificationProcessor extends IProcessor {
    Input: OnAirNotification|undefined;
    Translated: TranslatedNotification|undefined;
    Notification: Notification|undefined;
    Created: boolean|undefined;
    Updated: boolean|undefined;
    process(opts?:NotificationProcessorOptions): Promise<OnAirRefreshResults>;
    
}
