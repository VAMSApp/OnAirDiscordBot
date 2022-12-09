import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedAircraftType, InputResponse, OnAirAircraftTypeResponse } from '../types';
import { IBotContext, IAircraftTypeTranslator } from '../interfaces';
import { AircraftType as OnAirAircraftType } from "onair-api";

export class AircraftTypeTranslator extends BaseTranslator implements IAircraftTypeTranslator  {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirAircraftType, opts?:TranslatorOptions): TranslatedAircraftType {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedAircraftType = {
            Id: this.Input.Id,
            CreationDate: new Date(this.Input.CreationDate),
            LastModerationDate: new Date(this.Input.LastModerationDate),
            DisplayName: this.Input.DisplayName,
            TypeName: this.Input.TypeName,
            FlightsCount: this.Input.FlightsCount,
            TimeBetweenOverhaul: this.Input.TimeBetweenOverhaul,
            HightimeAirframe: this.Input.HightimeAirframe,
            AirportMinSize: this.Input.AirportMinSize,
            EmptyWeight: this.Input.emptyWeight,
            EstimatedCruiseFF: this.Input.estimatedCruiseFF,
            Baseprice: this.Input.Baseprice,
            FuelTotalCapacityInGallons: this.Input.FuelTotalCapacityInGallons,
            NumberOfEngines: this.Input.numberOfEngines,
            Seats: this.Input.seats,
            NeedsCopilot: this.Input.needsCopilot,
            MaximumCargoWeight: this.Input.maximumCargoWeight,
            MaximumRangeInHour: this.Input.maximumRangeInHour,
            MaximumRangeInNM: this.Input.maximumRangeInNM,
            DesignSpeedVS0: this.Input.designSpeedVS0,
            DesignSpeedVS1: this.Input.designSpeedVS1,
            DesignSpeedVC: this.Input.designSpeedVC,
            IsDisabled: this.Input.IsDisabled,
            LuxeFactor: this.Input.LuxeFactor,
            GliderHasEngine: this.Input.GliderHasEngine,
            StandardSeatWeight: this.Input.StandardSeatWeight,
            IsFighter: this.Input.IsFighter,
            EngineType: {
                connect: {
                    Id: this.Input.engineType,
                }
            },
            FuelType: {
                connect: {
                    Id: this.Input.fuelType,
                }
            },
            AircraftClass: {
                connect: {
                    Id: this.Input.AircraftClassId,
                }
            },
        };
        
        return translated;
    }
}

