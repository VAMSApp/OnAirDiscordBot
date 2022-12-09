

/**
 * Model JobType
 * 
 */
 export type JobType = {
    Id: string
    string: string
    Name: string
    ShortName: string
    Description: string
    BaseReputationImpact: number
    BasePayFactor: number
    BasePenalityFactor: number
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
  