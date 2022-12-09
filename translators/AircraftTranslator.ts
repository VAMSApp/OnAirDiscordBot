import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedAircraft, InputResponse, } from '../types';
import { Aircraft as OnAirAircraft, } from 'onair-api'
import { IBotContext, IAircraftTranslator } from '../interfaces';

export class AircraftTranslator extends BaseTranslator implements IAircraftTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirAircraft, opts?:TranslatorOptions): TranslatedAircraft {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedAircraft = {
            Id: this.Input.Id,
            CurrentCompanyIdIfAny: this.Input.CurrentCompanyIdIfAny,
            Identifier: this.Input.Identifier,
            Nickname: this.Input.Nickname,
            LastStatusChange: new Date(this.Input.LastStatusChange),
            CurrentStatusDurationInMinutes: this.Input.CurrentStatusDurationInMinutes,
            AllowSell: this.Input.AllowSell,
            AllowRent: this.Input.AllowRent,
            AllowLease: this.Input.AllowLease,
            SellPrice: this.Input.SellPrice,
            RentHourPrice: this.Input.RentHourPrice,
            RentFuelTotalGallons: this.Input.RentFuelTotalGallons,
            RentCautionAmount: this.Input.RentCautionAmount,
            RentStartDate: (this.Input.RentStartDate) ? new Date(this.Input.RentStartDate) : null,
            RentLastDailyChargeDate: (this.Input.RentLastDailyChargeDate) ? new Date(this.Input.RentLastDailyChargeDate) : null,
            Heading: this.Input.Heading,
            Longitude: this.Input.Longitude,
            Latitude: this.Input.Latitude,
            FuelTotalGallons: this.Input.fuelTotalGallons,
            FuelWeight: this.Input.fuelWeight,
            Altitude: this.Input.Altitude,
            FlightState: this.Input.FlightState,
            ZeroFuelWeight: this.Input.zeroFuelWeight,
            AirframeHours: this.Input.airframeHours,
            AirframeCondition: this.Input.airframeCondition,
            AirframeMaxCondition: this.Input.airframeMaxCondition,
            LastAnnualCheckup: (this.Input.LastAnnualCheckup) ? new Date(this.Input.LastAnnualCheckup) : null,
            Last100hInspection: (this.Input.Last100hInspection) ? new Date(this.Input.Last100hInspection) : null,
            LastWeeklyOwnershipPayment: (this.Input.LastWeeklyOwnershipPayment) ? new Date(this.Input.LastWeeklyOwnershipPayment) : null,
            LastParkingFeePayment: (this.Input.LastParkingFeePayment) ? new Date(this.Input.LastParkingFeePayment) : null,
            IsControlledByAI: this.Input.IsControlledByAI,
            HoursBefore100HInspection: this.Input.HoursBefore100HInspection,
            ConfigFirstSeats: this.Input.ConfigFirstSeats,
            ConfigBusSeats: this.Input.ConfigBusSeats,
            ConfigEcoSeats: this.Input.ConfigEcoSeats,
            SeatsReservedForEmployees: this.Input.SeatsReservedForEmployees,
            LastMagicTransportationDate: (this.Input.LastMagicTransportationDate) ? new Date(this.Input.LastMagicTransportationDate) : null,
            ExtraWeightCapacity: this.Input.ExtraWeightCapacity,
            TotalWeightCapacity: this.Input.TotalWeightCapacity,
            CurrentSeats: this.Input.CurrentSeats,
            MustDoMaintenance: this.Input.MustDoMaintenance,
            AircraftStatusId: this.Input.AircraftStatus,
            WorldId: this.Input.WorldId,
            AircraftTypeId: this.Input.AircraftTypeId,
            // World: {
            //     connect: {
            //         Id: this.Input.WorldId,
            //     }
            // },
            // RentalAirport: (this.Input.RentAirport.Id) ? {
            //     connectOrCreate: {
            //         where: {
            //             Id: this.Input.RentAirport.Id
            //         },
            //         create: this.App.OnAir.Translators.Airport.translate(this.Input.RentAirport)
            //     }
            // } : undefined,
            // CurrentAirport: (this.Input.CurrentAirport.Id) ? {
            //     connectOrCreate: {
            //         where: {
            //             Id: this.Input.CurrentAirport.Id
            //         },
            //         create: this.App.OnAir.Translators.Airport.translate(this.Input.CurrentAirport)
            //     }
            // } : undefined,
            // RentalCompany: (this.Input.RentCompany.Id) ? {
            //     connectOrCreate: {
            //         where: {
            //             Id: this.Input.RentCompany
            //         },
            //         create: this.App.OnAir.Translators.Company.translate(this.Input.RentCompany)
            //     }
            // } : undefined,
            // CurrentCompany: (this.Input.CurrentCompanyId) ? {
            //     connect: {
            //         Id: this.Input.CurrentCompanyId
            //     }
            // } : undefined,
            // OwnerCompany: (this.Input.OwnerCompanyId) ? {
            //     connectOrCreate: {
            //         where: {
            //             Id: this.Input.OwnerCompanyId,
            //         },
            //         create: this.App.OnAir.Translators.Company.translate(this.Input.OwnerCompany)
            //     },
            // } : undefined,
            // AircraftType: {
            //     connect: {
            //         Id: this.Input.AircraftTypeId,
            //     },
            // },
            // AircraftStatus: {
            //     connect: {
            //         Id: this.Input.AircraftStatus,
            //     }
            // },
        }
        
        return translated;
    }
}
