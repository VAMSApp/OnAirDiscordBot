import { Member } from ".";

export type TranslatedVARole = {
    Id: string;
    VAId:                                   string
    Name:                                   string
    Permission:                             number
    IsDefaultNewRole:                       boolean
    Color:                                  string
    PayPercent:                             number
    IsHidden:                               boolean
    RestrictLoadingVAJobsIntoNonVAAircraft: boolean
    RestrictLoadingNonVAJobsIntoVAAircraft: boolean
    PayWeekly:                              number
    PayPerFlightHour:                       number
    OnAirSyncedAt?:                          Date
    UpdatedAt?:                              Date
    CreatedAt?:                              Date
    Members?:                                Member
}
