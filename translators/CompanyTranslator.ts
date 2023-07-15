import { Company as OnAirCompany, } from 'onair-api';
import { Prisma } from '@prisma/client';
import { IBotContext } from '@/interfaces';
import { BaseTranslator } from './BaseTranslator';
import { ITranslator } from '@/interfaces/ITranslator';

export class CompanyTranslator extends BaseTranslator<OnAirCompany, Prisma.CompanyCreateInput> implements ITranslator<OnAirCompany, Prisma.CompanyCreateInput> {
    constructor(app:IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(x:OnAirCompany):Prisma.CompanyCreateInput {
        if (!x) throw new Error('Input is required');
        if (!this.App) throw new Error('App is required');

        const vaId:string = this.App.config.onair.keys.vaId;

        const output:Prisma.CompanyCreateInput = {
            Id: x.Id,
            Name: x.Name,
            AirlineCode: x.AirlineCode,
            LastConnection: (x.LastConnection) ? new Date(x.LastConnection) : undefined,
            LastReportDate: (x.LastReportDate) ? new Date(x.LastReportDate) : undefined,
            Reputation: x.Reputation,
            CreationDate: (x.CreationDate) ? new Date(x.CreationDate) : undefined,
            DifficultyLevel: x.DifficultyLevel,
            UTCOffsetinHours: x.UTCOffsetinHours,
            Paused: x.Paused,
            PausedDate: (x.PausedDate) ? new Date(x.PausedDate) : undefined,
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
            CurrentBadgeId: x.CurrentBadgeId,
            CurrentBadgeUrl: x.CurrentBadgeUrl,
            CurrentBadgeName: x.CurrentBadgeName,
            LastWeeklyManagementsPaymentDate: (x.LastWeeklyManagementsPaymentDate) ? new Date(x.LastWeeklyManagementsPaymentDate) : undefined,
            OnAirSyncedAt: new Date(),
            VirtualAirline: {
                connect: {
                    Id: vaId
                }
            },
            World: {
                connect: {
                    Id: x.WorldId
                }
            }
        };

        return output;
    }
}
