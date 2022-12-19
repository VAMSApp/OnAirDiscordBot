import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedFlight, TranslatedAircraft, } from '../types';
import { Flight as OnAirFlight, } from 'onair-api'
import { IBotContext, IFlightTranslator } from '../interfaces';

export class FlightTranslator extends BaseTranslator implements IFlightTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirFlight, opts?:TranslatorOptions): TranslatedFlight {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        let translated:TranslatedFlight = {
            Id: this.Input.Id,
            Registered: this.Input.Registered,
            Category: this.Input.Category,
            ResultComments: this.Input.ResultComments,
            StartTime: (this.Input.StartTime) ? new Date(this.Input.StartTime) : undefined,
            EndTime: (this.Input.EndTime) ? new Date(this.Input.EndTime) : undefined,
            EngineOnTime: (this.Input.EngineOnTime) ? new Date(this.Input.EngineOnTime) : undefined,
            EngineOffTime: (this.Input.EngineOffTime) ? new Date(this.Input.EngineOffTime) : undefined,
            AirborneTime: (this.Input.AirborneTime) ? new Date(this.Input.AirborneTime) : undefined,
            LandedTime: (this.Input.LandedTime) ? new Date(this.Input.LandedTime) : undefined,
            IntendedFlightLevel: this.Input.IntendedFlightLevel,
            Passengers: this.Input.Passengers,
            Cargo: this.Input.Cargo,
            AddedFuelQty: this.Input.AddedFuelQty,
            IsAI: this.Input.IsAI,
            VerticalSpeedAtTouchdownMpS: this.Input.VerticalSpeedAtTouchdownMpS,
            MaxGForce: this.Input.MaxGForce,
            MinGForce: this.Input.MinGForce,
            MaxBank: this.Input.MaxBank,
            MaxPitch: this.Input.MaxPitch,
            HasStalled: this.Input.HasStalled,
            HasOverspeeded: this.Input.HasOverspeeded,
            Engine1Status: this.Input.Engine1Status,
            Engine2Status: this.Input.Engine2Status,
            Engine3Status: this.Input.Engine3Status,
            Engine4Status: this.Input.Engine4Status,
            Engine5Status: this.Input.Engine5Status,
            Engine6Status: this.Input.Engine6Status,
            XPFlight: this.Input.XPFlight,
            XPFlightBonus: this.Input.XPFlightBonus,
            XPMissions: this.Input.XPMissions,
            CargosTotalWeight: this.Input.CargosTotalWeight,
            PAXCount: this.Input.PAXCount,
            AircraftCurrentFOB: this.Input.AircraftCurrentFOB,
            AircraftCurrentAltitude: this.Input.AircraftCurrentAltitude,
            ActualCruiseAltitude: this.Input.ActualCruiseAltitude,
            ActualConsumptionAtCruiseLevelInLbsPerHour: this.Input.ActualConsumptionAtCruiseLevelInLbsPerHour,
            ActualTotalFuelConsumptionInLbs: this.Input.ActualTotalFuelConsumptionInLbs,
            ActualConsumptionAtCruiseLevelInGalPerHour: this.Input.ActualConsumptionAtCruiseLevelInGalPerHour,
            ActualTASAtCruiseLevel: this.Input.ActualTASAtCruiseLevel,
            ActualCruiseTimeInMinutes: this.Input.ActualCruiseTimeInMinutes,
            ActualPressureAltitude: this.Input.ActualPressureAltitude,
            RegisterState: this.Input.RegisterState,
            WrongFuelDetected: this.Input.WrongFuelDetected,
            WrongWeightDetected: this.Input.WrongWeightDetected,
            TimeOffset: this.Input.TimeOffset,
            StartLatitude: this.Input.StartLatitude,
            StartLongitude: this.Input.StartLongitude,
            StartHeading: this.Input.StartHeading,
            CanResumeOrAbort: this.Input.CanResumeOrAbort,
            EngineOnRealTime: (this.Input.EngineOnRealTime) ? new Date(this.Input.EngineOnRealTime) : undefined,
            EngineOffRealTime: (this.Input.EngineOffRealTime) ? new Date(this.Input.EngineOffRealTime) : undefined,
            LandedRealTime: (this.Input.LandedRealTime) ? new Date(this.Input.LandedRealTime) : undefined,
            AirborneRealTime: (this.Input.AirborneRealTime) ? new Date(this.Input.AirborneRealTime) : undefined,
            OnAirSyncedAt: (this.Input.OnAirSyncedAt) ? new Date(this.Input.OnAirSyncedAt) : undefined,
            UpdatedAt: (this.Input.UpdatedAt) ? new Date(this.Input.UpdatedAt) : undefined,
            CreatedAt: (this.Input.CreatedAt) ? new Date(this.Input.CreatedAt) : undefined,
        }

        if (opts && opts.includeRelations) {
            
            if (this.Input.AircraftId && this.Input.Aircraft) {
                translated.Aircraft = {
                    connectOrCreate: {
                        where: {
                            Id: this.Input.AircraftId
                        },
                        create: this.App.OnAir.Translators.Aircraft.translate(this.Input.Aircraft, { refresh: true, create: true, update: true, })
                    }
                }
            } else if (this.Input.AircraftId && opts.refresh === true) {
                translated.Aircraft = {
                    connectOrCreate: {
                        where: {
                            Id: this.Input.AircraftId
                        },
                        create: this.App.OnAir.Translators.Aircraft.translate(this.Input.Aircraft, { refresh: true, create: true, update: true, })
                    }
                }
            }
            if (this.Input.DepartureAirportId && this.Input.DepartureAirport) {
                translated.DepartureAirport = {
                    connectOrCreate: {
                        where: {
                            Id: this.Input.DepartureAirportId
                        },
                        create: this.App.OnAir.Translators.Airport.translate(this.Input.DepartureAirport, { refresh: true, create: true, update: true, })
                    }
                }
            }

            if (this.Input.ArrivalIntendedAirportId && this.Input.ArrivalIntendedAirport) {
                translated.ArrivalIntendedAirport = {
                    connectOrCreate: {
                        where: {
                            Id: this.Input.ArrivalIntendedAirportId
                        },
                        create: this.App.OnAir.Translators.Airport.translate(this.Input.ArrivalIntendedAirport, { refresh: true, create: true, update: true, })
                    }
                }
            }

            if (this.Input.ArrivalAlternateAirportId && this.Input.ArrivalAlternateAirport) {
                translated.ArrivalAlternateAirport = {
                    connectOrCreate: {
                        where: {
                            Id: this.Input.ArrivalAlternateAirportId
                        },
                        create: this.App.OnAir.Translators.Airport.translate(this.Input.ArrivalAlternateAirport, { refresh: true, create: true, update: true, })
                    }
                }
            }

            if (this.Input.ArrivalActualAirportId && this.Input.ArrivalActualAirport) {
                translated.ArrivalActualAirport = {
                    connectOrCreate: {
                        where: {
                            Id: this.Input.ArrivalActualAirportId
                        },
                        create: this.App.OnAir.Translators.Airport.translate(this.Input.ArrivalActualAirport, { refresh: true, create: true, update: true, })
                    }
                }
            }

        }
        
        return translated;
    }
}
