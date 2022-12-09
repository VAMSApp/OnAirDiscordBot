

/**
 * Model Charter
 * 
 */
 export type Charter = {
    Id: string
    JobId: string
    CharterTypeId: string
    CurrentAirportId: string | null
    PassengersNumber: string
    DepartureAirportId: string | null
    DestinationAirportId: string | null
    AssignedToVAMemberId: string | null
    Distance: number | null
    Heading: number | null
    Description: string
    HumanOnly: boolean
    Companystring: string
    InRecyclingPool: boolean
    MinPAXSeatConf: number
    BoardedPAXSeat: number
    MinAircraftTypeLuxe: number
    RescueValidated: boolean
    RescueLate: boolean
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
  