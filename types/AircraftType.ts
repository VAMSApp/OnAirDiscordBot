import { AircraftClass } from '.';


/**
 * Model AircraftType
 * 
 */
export type AircraftType = {
    Id: string
    AircraftClassId?: string
    CreationDate: Date
    LastModerationDate: Date
    DisplayName: string
    TypeName: string
    FlightsCount: number
    TimeBetweenOverhaul: number
    HightimeAirframe: number
    AirportMinSize: number
    EmptyWeight?: number
    MaximumGrossWeight?: number
    EstimatedCruiseFF?: number
    Baseprice?: number
    FuelTotalCapacityInGallons?: number
    EngineType?: number
    NumberOfEngines?: number
    Seats?: number
    NeedsCopilot?: boolean
    FuelType?: number
    MaximumCargoWeight?: number
    MaximumRangeInHour?: number
    MaximumRangeInNM?: number
    DesignSpeedVS0?: number
    DesignSpeedVS1?: number
    DesignSpeedVC?: number
    IsDisabled?: boolean
    LuxeFactor?: number
    GliderHasEngine?: boolean
    StandardSeatWeight?: number
    IsFighter?: boolean
    OnAirSyncedAt?: Date | null
    UpdatedAt?: Date | null
    CreatedAt?: Date
    AircraftClass?: any
    emptyWeight?: number;
    maximumGrossWeight?: number;
    estimatedCruiseFF?: number;
    engineType?: number;
    numberOfEngines?: number;
    fuelType?: number;
    designSpeedVS0?: number;
    designSpeedVS1?: number;
    designSpeedVC?: number;
  }
  