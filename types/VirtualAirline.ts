
export type VirtualAirline = {
    Id: string
    Name: string
    AirlineCode: string
    ApiKey: string
    OwnerId: string | null
    InitalOwnerEquity: number | null
    PercentDividendsToDistribute: number | null
    LastDividendsDistribution: Date | null
    ImageName: string | null
    ForceAssignJobsToPilots: boolean | null
    AutomaticallyAssignJobWhenTaken: boolean | null
    AutomaticallyAssignJobWhenLoaded: boolean | null
    RestrictEmployeesUsage: boolean | null
    RestrictLoadingVAJobsIntoNonVAAircraft: boolean | null
    RestrictLoadingNonVAJobsIntoVAAircraft: boolean | null
    MemberCount: number | null
    LastConnection: Date | null
    LastReportDate: Date | null
    Reputation: number | null
    CreationDate: Date
    DifficultyLevel: number | null
    UTCOffsetinHours: number | null
    Paused: boolean | null
    Level: number | null
    LevelXP: number | null
    TransportEmployeeInstant: boolean | null
    TransportPlayerInstant: boolean | null
    ForceTimeInSimulator: boolean | null
    UseSmallAirports: boolean | null
    UseOnlyVanillaAirports: boolean | null
    EnableSkillTree: boolean | null
    CheckrideLevel: number | null
    EnableLandingPenalities: boolean | null
    EnableEmployeesFlightDutyAndSleep: boolean | null
    AircraftRentLevel: number | null
    EnableCargosAndChartersLoadingTime: boolean | null
    InSurvival: boolean | null
    PayBonusFactor: number | null
    EnableSimFailures: boolean | null
    DisableSeatsConfigCheck: boolean | null
    RealisticSimProcedures: boolean | null
    TravelTokens: number | null
    OnAirSyncedAt: Date | null
    CreatedAt?: Date
    UpdatedAt?: Date | null
  }
