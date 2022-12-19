import { People as OnAirEmployee } from 'onair-api';
import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedEmployee } from '../types';
import { IBotContext, IEmployeeTranslator } from '../interfaces';

export class EmployeeTranslator extends BaseTranslator implements IEmployeeTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirEmployee, opts?:TranslatorOptions): TranslatedEmployee {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedEmployee = {
            Id: this.Input.Id,
            Pseudo: this.Input.Pseudo,
            CompanyId: this.Input.CompanyId,
            CurrentAirportId: this.Input.CurrentAirportId,
            HomeAirportId: this.Input.HomeAirportId,
            FlightHoursTotalBeforeHiring: this.Input.FlightHoursTotalBeforeHiring,
            FlightHoursInCompany: this.Input.FlightHoursInCompany,
            BirthDate: (this.Input.BirthDate) ? new Date(this.Input.BirthDate) : null,
            Category: this.Input.Category,
            Status: this.Input.Status,
            LastStatusChange: (this.Input.LastStatusChange) ? new Date(this.Input.LastStatusChange) : null,
            IsOnline: this.Input.IsOnline,
            FlightHoursGrandTotal: this.Input.FlightHoursGrandTotal,
            Company: (this.Input.Company) ? this.Input.Company : undefined,
            HomeAirport: (this.Input.HomeAirport) ? this.Input.HomeAirport : undefined,
            CurrentAirport: (this.Input.CurrentAirport) ? this.Input.CurrentAirport : undefined,
        };
        
        return translated;
    }
}

