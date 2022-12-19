import { Member as OnAirMember } from 'onair-api';
import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedMember } from '../types';
import { IBotContext, IMemberTranslator } from '../interfaces';

export class MemberTranslator extends BaseTranslator implements IMemberTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirMember, opts?:TranslatorOptions): TranslatedMember {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedMember = {
            Id: this.Input.Id, // string
            VaId: this.Input.VaId, // string
            CompanyId: this.Input.CompanyId, // string
            VARoleId: this.Input.VARoleId, // string
            TotalCargosTransportedLbs: this.Input.TotalCargosTransportedLbs, // number
            TotalPAXsTransported: this.Input.TotalPAXsTransported, // number
            TotalEarnedCredits: this.Input.TotalEarnedCredits, // number
            TotalSpentCredits: this.Input.TotalSpentCredits, // number
            NumberOfFlights: this.Input.NumberOfFlights, // number
            FlightHours: this.Input.FlightHours, // number
            Color: this.Input.Color, // string
            AcceptMigration: this.Input.AcceptMigration, // boolean
            ReputationImpact: this.Input.ReputationImpact, // number
            LastWeeklyPay: (this.Input.LastWeeklyPay) ? new Date(this.Input.LastWeeklyPay) : null, // Date
            OnAirSyncedAt: (this.Input.OnAirSyncedAt) ? new Date(this.Input.OnAirSyncedAt) : null, // Date | null
            UpdatedAt: (this.Input.UpdatedAt) ? new Date(this.Input.UpdatedAt) : null, // Date | null
            CreatedAt: (this.Input.CreatedAt) ? new Date(this.Input.CreatedAt) : null, // Date
        };
        
        return translated;
    }
}

