import { Company as OnAirCompany } from 'onair-api';
import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedCompany } from '../types';
import { IBotContext, ICompanyTranslator } from '../interfaces';

export class CompanyTranslator extends BaseTranslator implements ICompanyTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirCompany, opts?:TranslatorOptions): TranslatedCompany {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedCompany = {
            Id: this.Input.Id, // string;
            Name: this.Input.Name, // string;
            AirlineCode: this.Input.AirlineCode, // string;
            LastConnection: (this.Input.LastConnection) ? new Date(this.Input.LastConnection) : null, // Date|null;
            LastReportDate: (this.Input.LastReportDate) ? new Date(this.Input.LastReportDate) : null, //  Date|null;
            Reputation: this.Input.Reputation, // number;
            CreationDate: new Date(this.Input.CreationDate), // Date;
            DifficultyLevel: this.Input.DifficultyLevel, // number;
            UTCOffsetinHours: this.Input.UTCOffsetinHours, // number;
            Paused: this.Input.Paused, // boolean;
            PausedDate: (this.Input.PausedDate) ? new Date(this.Input.PausedDate) : null, // string;
            Level: this.Input.Level, // number;
            LevelXP: this.Input.LevelXP, // number;
            TransportEmployeeInstant: this.Input.TransportEmployeeInstant, // boolean;
            TransportPlayerInstant: this.Input.TransportPlayerInstant, // boolean;
            ForceTimeInSimulator: this.Input.ForceTimeInSimulator, // boolean;
            UseSmallAirports: this.Input.UseSmallAirports, // boolean;
            UseOnlyVanillaAirports: this.Input.UseOnlyVanillaAirports, // boolean;
            EnableSkillTree: this.Input.EnableSkillTree, // boolean;
            CheckrideLevel: this.Input.CheckrideLevel, // number;
            EnableLandingPenalities: this.Input.EnableLandingPenalities, // boolean;
            EnableEmployeesFlightDutyAndSleep: this.Input.EnableEmployeesFlightDutyAndSleep, // boolean;
            AircraftRentLevel: this.Input.AircraftRentLevel, // number;
            EnableCargosAndChartersLoadingTime: this.Input.EnableCargosAndChartersLoadingTime, // boolean;
            InSurvival: this.Input.InSurvival, // boolean;
            PayBonusFactor: this.Input.PayBonusFactor, // number;
            EnableSimFailures: this.Input.EnableSimFailures, // boolean;
            DisableSeatsConfigCheck: this.Input.DisableSeatsConfigCheck, // boolean;
            RealisticSimProcedures: this.Input.RealisticSimProcedures, // boolean;
            TravelTokens: this.Input.TravelTokens, // number;
            CurrentBadgeId: this.Input.CurrentBadgeId, // string;
            CurrentBadgeUrl: this.Input.CurrentBadgeUrl, // string;
            CurrentBadgeName: this.Input.CurrentBadgeName, // string;
            LastWeeklyManagementsPaymentDate: (this.Input.LastWeeklyManagementsPaymentDate) ? new Date(this.Input.LastWeeklyManagementsPaymentDate) : null, // Date|null;
            WorldId: this.Input.WorldId,
        };
        
        return translated;
    }
}

