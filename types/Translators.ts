import {
    HumanizedResponse,
    OmittedResponse,
    OnAirResultsResponse,
    ResultsResponse,
    SerializedResponse,
    TranslatedResponse,
} from '.';

export type Translator = {
    IsSyncable:boolean;
    Input:any;
    Translated:TranslatedResponse|undefined;
    validUuid(x:string):boolean;
    validate(x:any):any;
    determineCanSync(x:any, syncInterval?:number):any;
    serialize(x:OnAirResultsResponse):SerializedResponse;
    humanize(x:ResultsResponse, keys:string[]|string):HumanizedResponse;
    omit(x:ResultsResponse, keys:string[]):OmittedResponse;
    translate(x:any):TranslatedResponse;    
}

export type Translators = {
    AircraftClass: Translator;
    AircraftType: Translator;
    AircraftEngine: Translator;
    Aircraft: Translator;
}
