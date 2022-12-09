import { Airport, Company } from "types"
import { AircraftEngine } from "./AircraftEngine"

/**
 * Model Aircraft
 * 
 */
 export declare type Aircraft = {
    Id: string;
    Nickname: string;    
    AircraftStatus: number;
    AircraftStatusName: string;
    LastStatusChange: string;
    CurrentStatusDurationInMinutes: number;
    AllowSell: boolean;
    AllowRent: boolean;
    AllowLease: boolean;
    SellPrice: number;
    RentHourPrice: number;
    RentAirport: Airport;
    RentFuelTotalGallons: number;
    RentCautionAmount: number;
    RentCompany: Company;
    RentStartDate: string;
    RentLastDailyChargeDate: string;
    Identifier: string;
    Heading: number;
    Longitude: number;
    Latitude: number;
    fuelTotalGallons: number;
    fuelWeight: number;
    loadedWeight: number;
    zeroFuelWeight: number;
    airframeHours: number;
    airframeCondition: number;
    AirframeMaxCondition: number;
    LastAnnualCheckup: string;
    Last100hInspection: string;
    LastWeeklyOwnershipPayment: string;
    LastParkingFeePayment: string;
    IsControlledByAI: boolean;
    HoursBefore100HInspection: number;
    ConfigFirstSeats: number;
    ConfigBusSeats: number;
    ConfigEcoSeats: number;
    SeatsReservedForEmployees: number;
    RemainingMaintenanceWorkHours: number;
    CurrentCompanyIdIfAny: string;
    ExtraWeightCapacity: number;
    TotalWeightCapacity: number;
    CurrentSeats: number;
    MustDoMaintenance: boolean;
    RentMaxDate: string;
    Altitude: string;
    FlightState: string;
    AircraftTypeId?: string;
    WorldId?: string;
    CurrentAirportId?: string;
    RentAirportId?: string;
    RentCompanyId?: string;
    CurrentCompanyId?: string;    
    OnAirSyncedAt?: Date;
    Engines?: any,
    RentalAirport?: any;
    CurrentAirport?: any;
    RentalCompany?: any;
    CurrentCompany?: any;
    OwnerCompany?: any;
    AircraftType?: any;
    World?: any;
  }
