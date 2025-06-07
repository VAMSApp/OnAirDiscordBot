import { OnAirVirtualAirline } from "./OnAirResponses"

export class VirtualAirline {
  Id: string
  InitalOwnerEquity: number
  PercentDividendsToDistribute: number
  Description: string
  LastDividendsDistribution: Date | null;
  LastComputationDate: Date | null;
  ComputedMemberCount: number
  ComputedAircraftsCount: number
  ComputedNumberOfFlights30Days: number
  ComputedNumberOfFlightHours30Days: number
  ComputedMostUsedAirports: string
  Name: string
  Identifier: string
  LastConnection: Date | null;
  LastReportDate: Date | null;
  Reputation: number
  CreationDate: Date
  DifficultyLevel: number
  UTCOffsetinHours: number
  Paused: boolean
  Level: number
  LevelXP: number
  TotalContractsCompleted: number
  TotalContractsEarnedCredits: number
  LastRefresh!: Date | null;

  constructor(data: OnAirVirtualAirline) {
    this.Id = data.Id;
    this.InitalOwnerEquity = data.InitalOwnerEquity;
    this.PercentDividendsToDistribute = data.PercentDividendsToDistribute;
    this.Description = data.Description;
    this.LastDividendsDistribution = new Date(data.LastDividendsDistribution || data.CreationDate);
    this.LastComputationDate = new Date(data.LastComputationDate || data.CreationDate);
    this.ComputedMemberCount = data.ComputedMemberCount;
    this.ComputedAircraftsCount = data.ComputedAircraftsCount;
    this.ComputedNumberOfFlights30Days = data.ComputedNumberOfFlights30Days;
    this.ComputedNumberOfFlightHours30Days = data.ComputedNumberOfFlightHours30Days;
    this.ComputedMostUsedAirports = data.ComputedMostUsedAirports;
    this.Name = data.Name;
    this.Identifier = data.AirlineCode;
    this.LastConnection = (data.LastConnection) ? new Date(data.LastConnection) : null;
    this.LastReportDate = (data.LastReportDate) ? new Date(data.LastReportDate) : null;
    this.Reputation = data.Reputation;
    this.CreationDate = new Date(data.CreationDate);
    this.DifficultyLevel = data.DifficultyLevel;
    this.UTCOffsetinHours = data.UTCOffsetinHours;
    this.Paused = data.Paused;
    this.Level = data.Level;
    this.LevelXP = data.LevelXP;
    this.TotalContractsCompleted = data.TotalContractsCompleted;
    this.TotalContractsEarnedCredits = data.TotalContractsEarnedCredits;
  } 
}

export type CreateVirtualAirline = {
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
