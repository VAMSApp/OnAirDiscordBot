import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedAircraftClass, OnAirAircraftClassResponse } from '../types';
import { IAircraftClassTranslator, IBotContext } from '../interfaces';

export class AircraftClassTranslator extends BaseTranslator implements IAircraftClassTranslator {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirAircraftClassResponse, opts?:TranslatorOptions): TranslatedAircraftClass {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedAircraftClass = {
            Id: this.Input.Id,
            ShortName: this.Input.ShortName,
            Name: this.Input.Name,
            Order: this.Input.Order,
        };
        
        return translated;
    }
}
