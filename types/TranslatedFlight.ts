import { Company, Airport, AircraftEngine, AircraftType } from '.';

export type TranslatedFlight = {
    Id: string
    Registered?: boolean
    Category: number
    ResultComments?: string | null
    StartTime?: Date | null
    EndTime?: Date | null
    EngineOnTime?: Date | null
    EngineOffTime?: Date | null
    AirborneTime?: Date | null
    LandedTime?: Date | null
    IntendedFlightLevel?: number | null
    Passengers?: number | null
    Cargo?: number | null
    AddedFuelQty?: number | null
    IsAI?: boolean | null
    VerticalSpeedAtTouchdownMpS?: number | null
    MaxGForce?: number | null
    MinGForce?: number | null
    MaxBank?: number | null
    MaxPitch?: number | null
    HasStalled?: boolean | null
    HasOverspeeded?: boolean | null
    Engine1Status?: number | null
    Engine2Status?: number | null
    Engine3Status?: number | null
    Engine4Status?: number | null
    Engine5Status?: number | null
    Engine6Status?: number | null
    XPFlight?: number | null
    XPFlightBonus?: number | null
    XPMissions?: number | null
    CargosTotalWeight?: number | null
    PAXCount?: number | null
    AircraftCurrentFOB?: number | null
    AircraftCurrentAltitude?: number | null
    ActualCruiseAltitude?: number | null
    ActualConsumptionAtCruiseLevelInLbsPerHour?: number | null
    ActualTotalFuelConsumptionInLbs?: number | null
    ActualConsumptionAtCruiseLevelInGalPerHour?: number | null
    ActualTASAtCruiseLevel?: number | null
    ActualCruiseTimeInMinutes?: number | null
    ActualPressureAltitude?: number | null
    RegisterState?: number | null
    WrongFuelDetected?: boolean | null
    WrongWeightDetected?: boolean | null
    TimeOffset?: number | null
    StartLatitude?: number | null
    StartLongitude?: number | null
    StartHeading?: number | null
    CanResumeOrAbort?: boolean | null
    EngineOnRealTime?: Date | null
    EngineOffRealTime?: Date | null
    LandedRealTime?: Date | null
    AirborneRealTime?: Date | null
    OnAirSyncedAt?: Date | null
    UpdatedAt?: Date | null
    CreatedAt?: Date | null
    Company?: any
    CompanyId?: string
    Notification?: any
    NotificationId?: string
    Aircraft?:any
    AircraftId?: string
    DepartureAirport?: any
    DepartureAirportId?: string
    ArrivalIntendedAirport?: any
    ArrivalIntendedAirportId?: string
    ArrivalAlternateAirport?: any
    ArrivalAlternateAirportId?: string
    ArrivalActualAirport?: any
    ArrivalActualAirportId?: string

}
