
/**
 * Model Job
 * 
 */
export type Job = {
    Id: string
    JobTypeId: string
    CompanyId: string
    MainAirportId: string | null
    BaseAirportId: string | null
    ValuePerLbsPerDistance: number
    IsGoodValue: boolean
    MaxDistance: number
    TotalDistance: number
    MainAirportHeading: number
    Description: string
    ExpirationDate: Date
    Pay: number
    PayLastMinuteBonus: number | null
    Penality: number
    ReputationImpact: number
    CreationDate: Date
    TakenDate: Date
    TotalCargoTransported: number
    TotalPaxTransported: number
    Category: number
    State: number
    XP: number
    SkillPoint: number
    MinCompanyReput: number
    RealPay: number
    RealPenality: number
    CanAccess: boolean
    IsLastMinute: boolean
    IsFavorited: boolean
    QueriedFromFboId: string | null
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
  