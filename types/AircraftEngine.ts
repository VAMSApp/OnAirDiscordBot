
/**
 * Model AircraftEngine
 * 
 */
 export type AircraftEngine = {
    Id: string
    AircraftId: string
    Number: number
    Condition: number
    MaxCondition: number
    EngineHours: number
    LastCheckup?: Date
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
