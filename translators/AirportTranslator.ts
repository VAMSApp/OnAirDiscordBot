import { AirportResponse } from 'onair-api';
import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedAirport } from '../types';
import { IAirportTranslator, IBotContext } from '../interfaces';

export class AirportTranslator extends BaseTranslator implements IAirportTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:AirportResponse, opts?:TranslatorOptions): TranslatedAirport {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedAirport = {
            Id: this.Input.Id,
            ICAO: this.Input.ICAO,
            IATA: this.Input.IATA,
            DisplayName: this.Input.DisplayName,
            HasNoRunways: this.Input.HasNoRunways,
            TimeOffsetInSec: this.Input.TimeOffsetInSec,
            LocalTimeOpenInHoursSinceMidnight: this.Input.LocalTimeOpenInHoursSinceMidnight,
            LocalTimeCloseInHoursSinceMidnight: this.Input.LocalTimeCloseInHoursSinceMidnight,
            Name: this.Input.Name,
            State: this.Input.State,
            CountryCode: this.Input.CountryCode,
            CountryName: this.Input.CountryName,
            City: this.Input.City,
            Latitude: this.Input.Latitude,
            Longitude: this.Input.Longitude,
            Elevation: this.Input.Elevation,
            HasLandRunway: (this.Input.HasLandRunway) ? this.Input.HasLandRunway : false,
            HasWaterRunway: (this.Input.HasWaterRunway) ? this.Input.HasWaterRunway : false,
            HasHelipad: (this.Input.HasHelipad) ? this.Input.HasHelipad : false,
            Size: this.Input.Size,
            TransitionAltitude: this.Input.TransitionAltitude,
            LastMETARDate: this.Input.LastMETARDate,
            IsNotInVanillaFSX: this.Input.IsNotInVanillaFSX,
            IsNotInVanillaP3D: this.Input.IsNotInVanillaP3D,
            IsNotInVanillaXPLANE: this.Input.IsNotInVanillaXPLANE,
            IsNotInVanillaFS2020: this.Input.IsNotInVanillaFS2020,
            IsClosed: (this.Input.IsClosed) ? this.Input.IsClosed : null,
            IsValid: (this.Input.IsValid) ? this.Input.IsValid : null,
            MagVar: this.Input.MagVar,
            IsAddon: (this.Input.IsAddon) ? this.Input.IsAddon : null,
            RandomSeed: this.Input.RandomSeed,
            LastRandomSeedGeneration: (this.Input.LastRandomSeedGeneration) ? this.Input.LastRandomSeedGeneration : null,
            IsMilitary: (this.Input.IsMilitary) ? this.Input.IsMilitary : null,
            HasLights: (this.Input.HasLights) ? this.Input.HasLights : null,
            AirportSource: this.Input.AirportSource,
            LastVeryShortRequestDate: (this.Input.LastVeryShortRequestDate) ? this.Input.LastVeryShortRequestDate : null,
            LastSmallTripRequestDate: (this.Input.LastSmallTripRequestDate) ? this.Input.LastSmallTripRequestDate : null,
            LastMediumTripRequestDate: (this.Input.LastMediumTripRequestDate) ? this.Input.LastMediumTripRequestDate : null,
            LastShortHaulRequestDate: (this.Input.LastShortHaulRequestDate) ? this.Input.LastShortHaulRequestDate : null,
            LastMediumHaulRequestDate: (this.Input.LastMediumHaulRequestDate) ? this.Input.LastMediumHaulRequestDate : null,
            LastLongHaulRequestDate: (this.Input.LastLongHaulRequestDate) ? this.Input.LastLongHaulRequestDate : null,
            UTCTimeOpenInHoursSinceMidnight: this.Input.UTCTimeOpenInHoursSinceMidnight,
            UTCTimeCloseInHoursSinceMidnight: this.Input.UTCTimeCloseInHoursSinceMidnight,
        };
        
        return translated;
    }
}
