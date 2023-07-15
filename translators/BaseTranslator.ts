import { ITranslators } from '@/OnAir';
import { IBotContext } from '@/interfaces';
import { ITranslator } from '@/interfaces/ITranslator';
import uuid from 'uuid';
import { VirtualAirlineTranslator } from './VirtualAirlineTranslator';
import { MemberTranslator } from './MemberTranslator';
import { CompanyTranslator } from './CompanyTranslator';
import { VARoleTranslator } from './VARoleTranslator';

export class BaseTranslator<I, O> implements ITranslator<I, O> {
    protected App:IBotContext;
    protected Translators:ITranslators;

    constructor(app:IBotContext) {
        this.App = app;
        this.Translators = {
            VirtualAirline: new VirtualAirlineTranslator(app),
            Member: new MemberTranslator(app),
            Company: new CompanyTranslator(app),
            VARole: new VARoleTranslator(app),
        };

        this.validate = this.validate.bind(this);
        this.serialize = this.serialize.bind(this);
    }


    validate(x:I & {
        Id: string;
    }):I & {
        Id: string;
    } {
        if (!x) throw new Error('No input provided');
        if (typeof x !== 'object') throw new Error('Input must be an object');
        if (!x.Id) throw new Error('Input must have an Id');
        if (!uuid.validate(x.Id)) throw new Error('Input must have a valid Id');

        return x;
    }
    
    serialize(x:I & {
        Id: string;
    }):I & {
        Id: string;
    } {
        if (!x) throw new Error('Record is required');

        let parsedX:I & {
            Id: string;
        };

        try {
            parsedX = JSON.parse(JSON.stringify(x));
        }
        catch(e) {
            parsedX = x;
        }

        return parsedX;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    translate(x:I):O {
        throw new Error('Not implemented');
    }
}
