import { ITranslatedResponse, } from '.'
import {
    OnAirResultsResponse,
    SerializedResponse,
    ResultsResponse,
    HumanizedResponse,
    OmittedResponse,
} from '../types'

export interface ITranslator {
    IsSyncable:boolean;
    Input:any;
    Translated:ITranslatedResponse|undefined;
    validUuid(x:string):boolean;
    validate(x:any):any;
    determineCanSync(x:any, syncInterval?:number):any;
    serialize(x:OnAirResultsResponse):SerializedResponse;
    humanize(x:ResultsResponse, keys:string[]|string):HumanizedResponse;
    omit(x:ResultsResponse, keys:string[]):OmittedResponse;
    translate(x:any):ITranslatedResponse;
}
