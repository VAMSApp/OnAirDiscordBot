
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
    ForceAssignJobsToPilots: Boolean | null
    AutomaticallyAssignJobWhenTaken: Boolean | null
    AutomaticallyAssignJobWhenLoaded: Boolean | null
    RestrictEmployeesUsage: Boolean | null
    RestrictLoadingVAJobsIntoNonVAAircraft: Boolean | null
    RestrictLoadingNonVAJobsIntoVAAircraft: Boolean | null
    MemberCount: number | null
    LastConnection: Date | null
    LastReportDate: Date | null
    Reputation: number | null
    CreationDate: Date
    DifficultyLevel: number | null
    UTCOffsetinHours: number | null
    Paused: Boolean | null
    Level: number | null
    LevelXP: number | null
    TransportEmployeeInstant: Boolean | null
    TransportPlayerInstant: Boolean | null
    ForceTimeInSimulator: Boolean | null
    UseSmallAirports: Boolean | null
    UseOnlyVanillaAirports: Boolean | null
    EnableSkillTree: Boolean | null
    CheckrideLevel: number | null
    EnableLandingPenalities: Boolean | null
    EnableEmployeesFlightDutyAndSleep: Boolean | null
    AircraftRentLevel: number | null
    EnableCargosAndChartersLoadingTime: Boolean | null
    InSurvival: Boolean | null
    PayBonusFactor: number | null
    EnableSimFailures: Boolean | null
    DisableSeatsConfigCheck: Boolean | null
    RealisticSimProcedures: Boolean | null
    TravelTokens: number | null
    OnAirSyncedAt: Date | null
    CreatedAt?: Date
    UpdatedAt?: Date | null
  }
