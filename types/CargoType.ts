
/**
 * Model CargoType
 * 
 */
 export type CargoType = {
    Id: string
    string: string
    Name: string
    CargoTypeCategory: number
    MinLbs: number
    MaxLbs: number
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
  