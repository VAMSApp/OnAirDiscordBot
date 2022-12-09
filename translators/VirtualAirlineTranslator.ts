import { VirtualAirlineResponse } from 'onair-api';
import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedVirtualAirline } from '../types';
import { IBotContext, IVirtualAirlineTranslator } from '../interfaces';

export class VirtualAirlineTranslator extends BaseTranslator implements IVirtualAirlineTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:VirtualAirlineResponse, opts?:TranslatorOptions): TranslatedVirtualAirline {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedVirtualAirline = {
            Id: this.Input.Id,
            Name: this.Input.Name,
            AirlineCode: this.Input.AirlineCode,
            InitalOwnerEquity: this.Input.InitalOwnerEquity,
            PercentDividendsToDistribute: this.Input.PercentDividendsToDistribute,
            LastDividendsDistribution: new Date(this.Input.LastDividendsDistribution),
            ForceAssignJobsToPilots: this.Input.ForceAssignJobsToPilots,
            AutomaticallyAssignJobWhenTaken: this.Input.AutomaticallyAssignJobWhenTaken,
            AutomaticallyAssignJobWhenLoaded: this.Input.AutomaticallyAssignJobWhenLoaded,
            RestrictLoadingVAJobsIntoNonVAAircraft: this.Input.RestrictLoadingVAJobsIntoNonVAAircraft,
            RestrictLoadingNonVAJobsIntoVAAircraft: this.Input.RestrictLoadingNonVAJobsIntoVAAircraft,
            MemberCount: this.Input.MemberCount,
            LastConnection: new Date(this.Input.LastConnection),
            LastReportDate: new Date(this.Input.LastReportDate),
            Reputation: this.Input.Reputation,
            CreationDate: new Date(this.Input.CreationDate),
            DifficultyLevel: this.Input.DifficultyLevel,
            UTCOffsetinHours: this.Input.UTCOffsetinHours,
            Paused: this.Input.Paused,
            Level: this.Input.Level,
            LevelXP: this.Input.LevelXP,
            TransportEmployeeInstant: this.Input.TransportEmployeeInstant,
            TransportPlayerInstant: this.Input.TransportPlayerInstant,
            ForceTimeInSimulator: this.Input.ForceTimeInSimulator,
            UseSmallAirports: this.Input.UseSmallAirports,
            UseOnlyVanillaAirports: this.Input.UseOnlyVanillaAirports,
            EnableSkillTree: this.Input.EnableSkillTree,
            CheckrideLevel: this.Input.CheckrideLevel,
            EnableLandingPenalities: this.Input.EnableLandingPenalities,
            EnableEmployeesFlightDutyAndSleep: this.Input.EnableEmployeesFlightDutyAndSleep,
            AircraftRentLevel: this.Input.AircraftRentLevel,
            EnableCargosAndChartersLoadingTime: this.Input.EnableCargosAndChartersLoadingTime,
            InSurvival: this.Input.InSurvival,
            PayBonusFactor: this.Input.PayBonusFactor,
            EnableSimFailures: this.Input.EnableSimFailures,
            DisableSeatsConfigCheck: this.Input.DisableSeatsConfigCheck,
            RealisticSimProcedures: this.Input.RealisticSimProcedures,
            TravelTokens: this.Input.TravelTokens,
            ImageName: '',
            RestrictEmployeesUsage: false
        };
        
        return translated;
    }
}
