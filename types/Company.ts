
/**
 * Model Company
 * 
 */
 export type Company = {
    Id: string
    Name: string
    AirlineCode: string
    ApiKey: string | null
    VirtualAirlineId: string | null
    OwnerId: string | null
    LastConnection?: Date | null
    LastReportDate: Date
    Reputation: number
    CreationDate: Date
    DifficultyLevel: number
    UTCOffsetinHours: number
    Paused: boolean
    PausedDate: Date | null
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
    CreatedAt: Date
    UpdatedAt: Date | null
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
