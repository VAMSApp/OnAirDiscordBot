import uuid from 'uuid';
import { ResultsResponse, OnAirResultsResponse, SerializedResponse, HumanizedResponse, OmittedResponse, } from "../types";
import { HumanizeDate } from "../utils";
import { IBotContext, ILogger, ITranslatedResponse, ITranslator } from "../interfaces";

class BaseTranslator implements ITranslator {
    App: IBotContext;
    Logger: ILogger;
    public IsSyncable:boolean = false;
    public Input:any;
    public Translated:any;

    constructor(app:IBotContext) {
        this.App = app;
        this.Logger = this.App.log;
        
        this.omit = this.omit.bind(this);

        this.humanize = this.humanize.bind(this);
        this.serialize = this.serialize.bind(this);
        this.validUuid = this.validUuid.bind(this);
        this.determineCanSync = this.determineCanSync.bind(this);
        this.validate = this.validate.bind(this);
        this.translate = this.translate.bind(this);

    }

    validUuid(x:string) {
        return uuid.validate(x);
    }

    validate(x:any) {
        if (!x) throw new Error('No input provided');
        if (typeof x !== 'object') throw new Error('Input must be an object');
        if (!x.Id) throw new Error('Input must have an Id');
        if (!this.validUuid(x.Id)) throw new Error('Input must have a valid Id');

        return x;
    }

    translate(x:any):ITranslatedResponse {
        if (!x) throw new Error('No input provided');
        if (typeof x !== 'object') throw new Error('Input must be an object');
        if (!x.Id) throw new Error('Input must have an Id');
        if (!this.validUuid(x.Id)) throw new Error('Input must have a valid Id');

        return {
            Id: x.Id,
            ...x,
        }
    }
    
    determineCanSync (x:any, syncInterval = 60000) {
        if (!x) return null;
        let canSync = false;
    
        // if OnAirSyncedAt is not null
        if (x.OnAirSyncedAt) {
            const currentDate = new Date()
            const OnAirSyncedAt = (typeof x.OnAirSyncedAt === 'string') ? new Date(x.OnAirSyncedAt) : x.OnAirSyncedAt;
    
            // if the difference between the current date and the OnAirSyncedAt date is greater than 1 minute
            if ((currentDate.valueOf() - OnAirSyncedAt.valueOf()) > syncInterval) {
                canSync = true
            }
        }
    
        return {
            ...x,
            canSync,
        }
    }

    serialize(x:OnAirResultsResponse) {
        if (!x) throw new Error('Record is required');
        let parsedX;
        try {
            parsedX = JSON.parse(JSON.stringify(x));
        }
        catch(e) {
            parsedX = x;
        }

        return parsedX
    }

    humanize(x:ResultsResponse, keys:string[]|string) {
        if (!x) throw new Error('Record is required');
        if (!keys) throw new Error('Keys are required');
        let humanizedResponse:HumanizedResponse = {
            ...x,
        };

        if (!Array.isArray(keys)) throw new Error('Keys must be an array');
        // if Users is an array
        if (Array.isArray(humanizedResponse)) {
            humanizedResponse.forEach((y) => {
                // loop through keys
                keys.forEach((key) => {
                    const k = key as keyof typeof y;
                    const obj:string = y[k];
                    if (!obj) return;
                    // humanize it
                    const humanizedIndex = `Humanized_${String(k)}`;
                    const humanizedIndexKey = humanizedIndex as keyof typeof y;
                    y = {
                        ...y,
                        [humanizedIndexKey]: HumanizeDate(obj.toString())
                    }
                });
            });
        } else {
            // loop through keys
            keys.forEach((key) => {
                // if key exists on user
                const k = key as keyof typeof x;
                const obj:string = x[k];
                if (!obj) return;
                // humanize it
                const humanizedIndex = `Humanized_${String(k)}`;
                const humanizedIndexKey = humanizedIndex as keyof typeof x;
                humanizedResponse = {
                    ...humanizedResponse,
                    [humanizedIndexKey]: HumanizeDate(obj.toString())
                }
            });
        }
        
        return humanizedResponse;
    };

    omit(x:ResultsResponse, keys:string[]) {
        if (!x) throw new Error('Record is required');
        if (!keys) throw new Error('Keys are required');
        let ommitedResponse:OmittedResponse = JSON.parse(JSON.stringify(x));

        if (Array.isArray(ommitedResponse)) {
            ommitedResponse.forEach((y) => {
                keys.forEach((k) => {
                    delete y[k];
                });
            });
        } else {
            keys.forEach((k) => {
                delete ommitedResponse[k];
            });
        }

        return ommitedResponse;
    }
}

export default BaseTranslator
