import { VirtualAirline as OnAirVirtualAirline, } from 'onair-api';
import { Prisma } from '@prisma/client';
import { IBotContext } from '@/interfaces';
import { ITranslator } from '@/interfaces/ITranslator';
import { BaseTranslator } from './BaseTranslator';

export class VirtualAirlineTranslator extends BaseTranslator<OnAirVirtualAirline, Prisma.VirtualAirlineCreateInput> implements ITranslator<OnAirVirtualAirline, Prisma.VirtualAirlineCreateInput> {    
    constructor(app:IBotContext) {
        super(app);
        
        this.translate = this.translate.bind(this);
    }

    translate(x:OnAirVirtualAirline):Prisma.VirtualAirlineCreateInput {
        if (!x) throw new Error('Input is required');
        if (!this.App) throw new Error('App is required');

        const apiKey:string = this.App.config.onair.keys.apiKey;

        const output:Prisma.VirtualAirlineCreateInput = {
            Id: x.Id,
            Name: x.Name,
            AirlineCode: x.AirlineCode,
            ApiKey: apiKey,
            InitalOwnerEquity: x.InitalOwnerEquity,
            PercentDividendsToDistribute: x.PercentDividendsToDistribute,
            LastDividendsDistribution: (x.LastDividendsDistribution) ? new Date(x.LastDividendsDistribution) : null,
            ForceAssignJobsToPilots: x.ForceAssignJobsToPilots,
            AutomaticallyAssignJobWhenTaken: x.AutomaticallyAssignJobWhenTaken,
            AutomaticallyAssignJobWhenLoaded: x.AutomaticallyAssignJobWhenLoaded,
            RestrictLoadingVAJobsIntoNonVAAircraft: x.RestrictLoadingVAJobsIntoNonVAAircraft,
            RestrictLoadingNonVAJobsIntoVAAircraft: x.RestrictLoadingNonVAJobsIntoVAAircraft,
            MemberCount: x.MemberCount,
            LastConnection: (x.LastConnection) ? new Date(x.LastConnection) : null,
            LastReportDate: (x.LastReportDate) ? new Date(x.LastReportDate) : null,
            Reputation: x.Reputation,
            CreationDate: (x.CreationDate) ? new Date(x.CreationDate) : new Date(),
            DifficultyLevel: x.DifficultyLevel,
            UTCOffsetinHours: x.UTCOffsetinHours,
            Paused: x.Paused,
            Level: x.Level,
            LevelXP: x.LevelXP,
            TransportEmployeeInstant: x.TransportEmployeeInstant,
            TransportPlayerInstant: x.TransportPlayerInstant,
            ForceTimeInSimulator: x.ForceTimeInSimulator,
            UseSmallAirports: x.UseSmallAirports,
            UseOnlyVanillaAirports: x.UseOnlyVanillaAirports,
            EnableSkillTree: x.EnableSkillTree,
            CheckrideLevel: x.CheckrideLevel,
            EnableLandingPenalities: x.EnableLandingPenalities,
            EnableEmployeesFlightDutyAndSleep: x.EnableEmployeesFlightDutyAndSleep,
            AircraftRentLevel: x.AircraftRentLevel,
            EnableCargosAndChartersLoadingTime: x.EnableCargosAndChartersLoadingTime,
            InSurvival: x.InSurvival,
            PayBonusFactor: x.PayBonusFactor,
            EnableSimFailures: x.EnableSimFailures,
            DisableSeatsConfigCheck: x.DisableSeatsConfigCheck,
            RealisticSimProcedures: x.RealisticSimProcedures,
            TravelTokens: x.TravelTokens,
            OnAirSyncedAt: new Date(),
            World: {
                connect: {
                    Id: x.WorldId
                }
            }
        };

        return output;
    }
}
