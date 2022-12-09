import BaseTranslator from './BaseTranslator'
import { TranslatorOptions, TranslatedAircraftEngine, OnAirAircraftEngineResponse } from '../types';
import { IBotContext, IAircraftEngineTranslator } from '../interfaces';

export class AircraftEngineTranslator extends BaseTranslator implements IAircraftEngineTranslator  {
    public IsSyncable: boolean = true;

    constructor(app: IBotContext) {
        super(app);
        this.translate = this.translate.bind(this);
    }

    translate(input:OnAirAircraftEngineResponse, opts?:TranslatorOptions): TranslatedAircraftEngine {
        if (!input) throw new Error('No input provided');
        this.Input = input;

        const translated:TranslatedAircraftEngine = {
            Id: this.Input.Id,
            Number: this.Input.Number,
            Condition: this.Input.Condition,
            MaxCondition: this.Input.MaxCondition,
            EngineHours: this.Input.EngineHours,
            LastCheckup: (this.Input.LastCheckup) ? new Date(this.Input.LastCheckup) : undefined,
            Aircraft: {
                connect: {
                    Id: this.Input.AircraftId,
                }
            },
        }

        return translated;
    }
}
