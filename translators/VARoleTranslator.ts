import { VARole as OnAirVARole } from 'onair-api';
import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedVARole } from '../types';
import { IBotContext, IVARoleTranslator } from '../interfaces';

export class VARoleTranslator extends BaseTranslator implements IVARoleTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirVARole, opts?:TranslatorOptions): TranslatedVARole {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedVARole = {
            Id: this.Input.Id,
            VAId: this.Input.VAId,
            Name: this.Input.Name,
            Permission: this.Input.Permission,
            IsDefaultNewRole: this.Input.IsDefaultNewRole,
            Color: this.Input.Color,
            PayPercent: this.Input.PayPercent, //                             Float 
            IsHidden: this.Input.IsHidden, //                               Boolean            
            RestrictLoadingVAJobsIntoNonVAAircraft: this.Input.RestrictLoadingVAJobsIntoNonVAAircraft, // Boolean            
            RestrictLoadingNonVAJobsIntoVAAircraft: this.Input.RestrictLoadingNonVAJobsIntoVAAircraft, // Boolean            
            PayWeekly: this.Input.PayWeekly, //                              Float 
            PayPerFlightHour: this.Input.PayPerFlightHour, //                       Float 
            OnAirSyncedAt: (this.Input.OnAirSyncedAt) ? new Date(this.Input.OnAirSyncedAt) : undefined, //                          DateTime?
            UpdatedAt: (this.Input.UpdatedAt) ? new Date(this.Input.UpdatedAt) : undefined, //                              DateTime?
            CreatedAt: (this.Input.CreatedAt) ? new Date(this.Input.CreatedAt) : undefined, //                              DateTime 
        };
        
        return translated;
    }
}

