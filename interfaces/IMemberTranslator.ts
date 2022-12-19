import { OnAirMemberResponse, TranslatedMember, TranslatorOptions } from "../types";
import { ITranslator } from ".";
import { Member as OnAirMember } from 'onair-api'

export interface IMemberTranslator extends ITranslator {
    Input:OnAirMember;
    Translated:TranslatedMember|undefined;
    translate(input:OnAirMember, opts?:TranslatorOptions): TranslatedMember
}
