
/**
 * Model Cargo
 * 
 */
export type Cargo = {
    Id: string
    JobId: string
    CargoTypeId: string
    CurrentAirportId: string
    DepartureAirportId: string | null
    PassengersNumber: number
    DestinationAirportId: string | null
    AssignedToVAMemberId: string | null
    Distance: number | null
    Weight: number | null
    Heading: number | null
    Description: string
    HumanOnly: boolean
    Companystring: string
    InRecyclingPool: boolean
    RaceValidated: boolean
    IsInHangar: boolean
    RescueValidated: boolean
    RescueLate: boolean
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
