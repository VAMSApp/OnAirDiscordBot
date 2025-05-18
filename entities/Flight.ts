import { OnAirFlight, FLIGHT_COMPLETED, FLIGHT_CANCELLED, FLIGHT_IN_PROGRESS, FLIGHT_REGISTERED, FlightStatus } from "@/types";
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Flight {
    @PrimaryColumn({ primary: true, unique: true, type: 'uuid' })
    Id: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    Status: number;

    @Column({ type: 'varchar', length: 255 })
    AircraftId: string;

    @Column({ type: 'varchar', length: 255 })
    Aircraft: string;

    @Column({ type: 'varchar', length: 255 })
    CompanyId: string;

    @Column({ type: 'varchar', length: 255 })
    Company: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    DepartureAirportId?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    DepartureAirport?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ArrivalIntendedAirportId?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ArrivalIntendedAirport?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ArrivalAlternateAirportId?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ArrivalActualAirportId?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ArrivalActualAirport?: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    Registered: boolean

    @Column({ type: 'int', nullable: false, default: 0 })
    CancelReason: number;
    
    @Column({ type: 'int', nullable: false, default: 0 })
    Category: number;
    
    @Column({ type: 'date', nullable: true })
    StartTime?: Date;

    @Column({ type: 'date', nullable: true })
    EndTime?: Date;

    @Column({ type: 'date', nullable: true })
    EngineOnTime?: Date;

    @Column({ type: 'date', nullable: true })
    EngineOffTime?: Date;

    @Column({ type: 'date', nullable: true })
    AirborneTime?: Date;

    @Column({ type: 'date', nullable: true })
    LandedTime?: Date;

    @Column({ type: 'int', nullable: false, default: 0 })
    IntendedFlightLevel: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    Passengers: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    Cargo: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    VerticalSpeedAtTouchdownMpS: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    MaxGForce: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    MinGForce: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    MaxBank: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    MaxPitch: number;

    @Column({ type: 'boolean', nullable: false, default: false })
    HasOverspeeded: boolean;

    @Column({ type: 'date', nullable: true })
    EngineOnRealTime?: Date;

    @Column({ type: 'date', nullable: true })
    EngineOffRealTime?: Date;

    @Column({ type: 'date', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CreatedAt?: Date;

    @Column({ type: 'date', nullable: true })
    UpdatedAt?: Date;

    private _determineStatus(flight: OnAirFlight): FlightStatus {
        let status = FLIGHT_REGISTERED; // 0 = FLIGHT_REGISTERED, 1 = FLIGHT_IN_PROGRESS, 2 = FLIGHT_COMPLETED, 9 = FLIGHT_CANCELLED
        if (flight.CancelReason) {
            status = FLIGHT_CANCELLED;
        } else if (flight.Registered === false && flight.AirborneTime && !flight.EndTime) {
            status = FLIGHT_IN_PROGRESS;
        } else if (flight.Registered === true && flight.EndTime) {
            status = FLIGHT_COMPLETED;
        }

        return status;
    }

    constructor(flight: OnAirFlight) {
        if (flight) {
            this.Id = flight.Id;
            this.Status = this._determineStatus(flight);
            this.AircraftId = flight.Aircraft?.Id;
            this.Aircraft = flight.Aircraft?.Identifier;
            this.CompanyId = flight.Company?.Id;
            this.Company = flight.Company?.AirlineCode;
            this.DepartureAirportId = flight.DepartureAirport?.Id;
            this.DepartureAirport = flight.DepartureAirport?.ICAO;
            this.ArrivalIntendedAirportId = flight.ArrivalIntendedAirport?.Id;
            this.ArrivalIntendedAirport = flight.ArrivalIntendedAirport?.ICAO;
            this.ArrivalAlternateAirportId = flight.ArrivalAlternateAirportId;
            this.ArrivalActualAirportId = flight.ArrivalActualAirportId;
            this.ArrivalActualAirport = flight.ArrivalActualAirport?.ICAO;
            this.Registered = flight.Registered;
            this.CancelReason = flight.CancelReason || 0;
            this.Category = flight.Category;
            this.StartTime = flight.StartTime ? new Date(flight.StartTime) : undefined;
            this.EndTime = flight.EndTime ? new Date(flight.EndTime) : undefined;
            this.EngineOnTime = flight.EngineOnTime ? new Date(flight.EngineOnTime) : undefined;
            this.EngineOffTime = flight.EngineOffTime ? new Date(flight.EngineOffTime) : undefined;
            this.AirborneTime = flight.AirborneTime ? new Date(flight.AirborneTime) : undefined;
            this.LandedTime = flight.LandedTime ? new Date(flight.LandedTime) : undefined;
            this.IntendedFlightLevel = flight.IntendedFlightLevel;
            this.Passengers = flight.Passengers;
            this.Cargo = flight.Cargo;
            this.VerticalSpeedAtTouchdownMpS = flight.VerticalSpeedAtTouchdownMpS;
            this.MaxGForce = flight.MaxGForce;
            this.MinGForce = flight.MinGForce;
            this.MaxBank = flight.MaxBank;
            this.MaxPitch = flight.MaxPitch;
            this.HasOverspeeded = flight.HasOverspeeded;
            this.EngineOnRealTime = flight.EngineOnRealTime ? new Date(flight.EngineOnRealTime) : undefined;
            this.EngineOffRealTime = flight.EngineOffRealTime ? new Date(flight.EngineOffRealTime) : undefined;
        }
    }
}