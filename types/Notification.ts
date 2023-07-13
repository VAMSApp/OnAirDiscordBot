

/**
 * Model Notification
 * 
 */
export type Notification = {
    Id: string
    VaId?: string | null
    CompanyId?: string | null
    AircraftId?: string | null
    FlightId?: string | null
    EmployeeId?: string | null
    IsRead: boolean
    IsNotification: boolean
    ZuluEventTime: Date
    CategoryId?: number
    ActionId?: number
    Description: string
    Amount: number
    OnAirSyncedAt?: Date | null
    UpdatedAt?: Date | null
    CreatedAt?: Date
    Company?: any
    Aircraft?: any
    Flight?: any
    Employee?: any
    Category?: any
    Action?: any
    VirtualAirline?: any
}


export type NotificationProcessorOptions = {
    translate?:boolean;
    create?:boolean;
    update?:boolean;
    include?:any;
    serialize?:boolean;
    humanize?:string[];
    orderBy?:string[];
    omit?:string[];
}
