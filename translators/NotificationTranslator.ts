import { Notification as OnAirNotification } from 'onair-api';
import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedNotification } from '../types';
import { IBotContext, INotificationTranslator } from '../interfaces';

export class NotificationTranslator extends BaseTranslator implements INotificationTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirNotification, opts?:TranslatorOptions): TranslatedNotification {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedNotification = {
            Id: this.Input.Id, //.string
            VirtualAirlineId: (this.Input.CompanyId) ? this.Input.CompanyId : null, // string | null
            AircraftId: (this.Input.AircraftId) ? this.Input.AircraftId : null, // string | null
            FlightId: (this.Input.FlightId) ? this.Input.FlightId : null, // string | null
            EmployeeId: (this.Input.PeopleId) ? this.Input.PeopleId : null, // string | null
            IsRead: this.Input.IsRead, //.boolean
            IsNotification: this.Input.IsNotification, //.boolean
            ZuluEventTime: new Date(this.Input.ZuluEventTime), //.Date
            CategoryId: (this.Input.CategoryId) ? this.Input.CategoryId : null, // number
            ActionId: (this.Input.ActionId) ? this.Input.ActionId : null, // number
            Description: this.Input.Description, //.string
            Amount: this.Input.Amount, //.number
            OnAirSyncedAt: (this.Input.OnAirSyncedAt) ? new Date(this.Input.OnAirSyncedAt) : undefined, //                          DateTime?
            UpdatedAt: (this.Input.UpdatedAt) ? new Date(this.Input.UpdatedAt) : undefined, //                              DateTime?
            CreatedAt: (this.Input.CreatedAt) ? new Date(this.Input.CreatedAt) : undefined, //                              DateTime 
        };
        
        return translated;
    }
}

