import { OnAirMemberResponse, TranslatedMember, Member, } from "../types";
import { IProcessor } from ".";
import { Member as OnAirMember } from "onair-api";

export interface IMemberProcessor extends IProcessor {
    Input: OnAirMember|undefined;
    Translated: TranslatedMember|undefined;
    Member: Member|undefined;
}
