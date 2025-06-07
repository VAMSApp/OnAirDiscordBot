import { DiscordUser } from "@prisma/client";
import { OnAirCompany } from "./OnAirResponses"

export type OnAirCompanyWithOwner = OnAirCompany & {
    OwnerId: string;
    Owner?: DiscordUser;
}

/**
 * Model Company
 * 
 */
export class Company {
    Id: string;
    Name: string;
    Identifier!: string;
    LastConnection: Date | null;
    LastReportDate: Date | null;
    Reputation: number;
    CreationDate: Date | null;
    DifficultyLevel: number;
    Paused: boolean;
    Level: number;
    LevelXP: number;
    LastRefresh!: Date | null;
    CreatedAt!: Date | null;
    UpdatedAt!: Date | null;
    OwnerId: string | null;

    constructor(data: OnAirCompany|OnAirCompanyWithOwner) {
        this.Id = data.Id;
        this.Name = data.Name;
        this.Identifier = data.AirlineCode;
        this.LastConnection = (data.LastConnection) ? new Date(data.LastConnection) : null;
        this.LastReportDate = (data.LastReportDate) ? new Date(data.LastReportDate) : null;
        this.Reputation = data.Reputation;
        this.CreationDate = (data.CreationDate) ? new Date(data.CreationDate) : null;
        this.DifficultyLevel = data.DifficultyLevel;
        this.Paused = data.Paused;
        this.Level = data.Level;
        this.LevelXP = data.LevelXP;
        this.LastRefresh = new Date();

        if ('OwnerId' in data && data.OwnerId) {
            this.OwnerId = data.OwnerId;
        } else {
            this.OwnerId = null;
        }
    }
}

export type NewCompany = {
    Id: string
    Name: string
    AirlineCode: string
    LastConnection?: Date | null
    LastReportDate?: Date | null
    Reputation: number
    CreationDate: Date
    DifficultyLevel: number
    UTCOffsetinHours: number
    Paused: boolean
    PausedDate?: Date | null
    Level: number
    LevelXP: number
    TransportEmployeeInstant: boolean
    TransportPlayerInstant: boolean
    ForceTimeInSimulator: boolean
    UseSmallAirports: boolean
    UseOnlyVanillaAirports: boolean
    EnableSkillTree: boolean
    CheckrideLevel: number
    EnableLandingPenalities: boolean
    EnableEmployeesFlightDutyAndSleep: boolean
    AircraftRentLevel: number
    EnableCargosAndChartersLoadingTime: boolean
    InSurvival: boolean
    PayBonusFactor: number
    EnableSimFailures: boolean
    DisableSeatsConfigCheck: boolean
    RealisticSimProcedures: boolean
    TravelTokens: number
    CurrentBadgeId: string | null
    CurrentBadgeUrl: string | null
    CurrentBadgeName: string | null
    LastWeeklyManagementsPaymentDate: Date | null
    OnAirSyncedAt: Date | null
    ApiKey?: string | null
    VirtualAirlineId?: string | null
    OwnerId?: string | null
    WorldId?: string | null
    VirtualAirline?: any
    Owner?: any
    World?: any
}
