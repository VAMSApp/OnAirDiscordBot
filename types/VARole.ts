

/**
 * Model VARole
 * 
 */
 export type VARole = {
    Id: string
    VAId: string
    Name: string
    Permission: number
    IsDefaultNewRole: boolean
    Color: string
    PayPercent: number
    IsHidden: boolean
    RestrictLoadingVAJobsIntoNonVAAircraft: boolean
    RestrictLoadingNonVAJobsIntoVAAircraft: boolean
    PayWeekly: number
    PayPerFlightHour: number
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
