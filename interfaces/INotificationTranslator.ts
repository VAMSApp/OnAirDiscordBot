import { TranslatedNotification, TranslatorOptions } from "../types";
import { ITranslator } from ".";
import { Notification as OnAirNotification } from 'onair-api'

export interface INotificationTranslator extends ITranslator {
    Input:OnAirNotification;
    Translated:TranslatedNotification|undefined;
    translate(input:OnAirNotification, opts?:TranslatorOptions): TranslatedNotification
}
