

/**
 * Model Notification
 * 
 */
 export type Notification = {
    Id: string
    VaId: string
    CompanyId: string | null
    AircraftId: string | null
    FlightId: string | null
    EmployeeId: string | null
    IsRead: boolean
    IsNotification: boolean
    ZuluEventTime: Date
    CategoryId: number
    ActionId: number
    Description: string
    Amount: number
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
  }
