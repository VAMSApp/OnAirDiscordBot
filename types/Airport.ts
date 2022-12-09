

/**
 * Model Airport
 * 
 */
 export type Airport = {
    Id: string
    ICAO: string
    IATA?: string | null
    DisplayName: string
    HasNoRunways: boolean | null
    TimeOffsetInSec: number | null
    LocalTimeOpenInHoursSinceMidnight: number | null
    LocalTimeCloseInHoursSinceMidnight: number | null
    Name: string
    State: string | null
    CountryCode: string | null
    CountryName: string | null
    City: string | null
    Latitude: number | null
    Longitude: number | null
    Elevation: number | null
    HasLandRunway: boolean | null
    HasWaterRunway: boolean | null
    HasHelipad: boolean | null
    Size: number
    TransitionAltitude: number | null
    LastMETARDate: Date | null
    IsNotInVanillaFSX: boolean | null
    IsNotInVanillaP3D: boolean | null
    IsNotInVanillaXPLANE: boolean | null
    IsNotInVanillaFS2020: boolean | null
    IsClosed: boolean | null
    IsValid: boolean | null
    MagVar: number | null
    IsAddon: boolean | null
    RandomSeed: number | null
    LastRandomSeedGeneration: Date | null
    IsMilitary: boolean | null
    HasLights: boolean | null
    AirportSource: number
    LastVeryShortRequestDate: Date | null
    LastSmallTripRequestDate: Date | null
    LastMediumTripRequestDate: Date | null
    LastShortHaulRequestDate: Date | null
    LastMediumHaulRequestDate: Date | null
    LastLongHaulRequestDate: Date | null
    UTCTimeOpenInHoursSinceMidnight: number | null
    UTCTimeCloseInHoursSinceMidnight: number | null
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
  