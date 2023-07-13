

/**
 * Model CharterType
 * 
 */
export type CharterType = {
    Id: string
    Name: string
    CharterTypeCategory: number
    MinPAX: number
    MaxPAX: number
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
