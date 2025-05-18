import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('airport')
export class Airport {
    @PrimaryColumn({ primary: true, unique: true, type: 'uuid' })
    Id: string;

    @Column({ type: 'varchar', length: 255 })
    ICAO: string;

    @Column({ type: 'varchar', length: 255 })
    IATA: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    HasNoRunways: boolean
    
    @Column({ type: 'float', nullable: false, default: 0 })
    TimeOffsetInSec: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    LocalTimeOpenInHoursSinceMidnight: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    LocalTimeCloseInHoursSinceMidnight: number;

    @Column({ type: 'varchar', length: 255 })
    Name: string;

    @Column({ type: 'varchar', length: 255 })
    State: string;

    @Column({ type: 'float', nullable: false, default: 0 })
    Longitude: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    Elevation: number;

    @Column({ type: 'boolean', nullable: false, default: false })
    HasLandRunway: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    HasWaterRunway: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    HasHelipad: boolean

    @Column({ type: 'int', nullable: false, default: 0 })
    Size: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    TransitionAltitude: number;

    @Column({ type: 'date', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    LastMETARDate: Date;

    @Column({ type: 'varchar', length: 255 })
    Description: string;

    @Column({ type: 'varchar', length: 255 })
    HomeWebSiteUrl: string;

    @Column({ type: 'varchar', length: 255 })
    WikiUrl: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    IsMilitary: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    HasLights: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    IsBasecamp: boolean

    @Column({ type: 'varchar', length: 255 })
    DisplayName: string;

    @Column({ type: 'date', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CreatedAt?: Date;

    @Column({ type: 'date', nullable: true })
    UpdatedAt?: Date;
}
