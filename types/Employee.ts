import { Account, Company } from '.';

export type Employee = {
    Id: string
    Pseudo: string
    CompanyId: string
    FlightHoursTotalBeforeHiring: number | null
    FlightHoursInCompany: number | null
    Category: number
    Status: number
    LastStatusChange: Date
    IsOnline: boolean
    FlightHoursGrandTotal: number | null
    OnAirSyncedAt: Date | null
    UpdatedAt: Date | null
    CreatedAt: Date
    Company?: Company  
    Notifications?: Notification[]
    Account?: Account
}

export type NewEmployee = {
    Id: string
    Pseudo: string
    CompanyId: string
    FlightHoursTotalBeforeHiring: number | null
    FlightHoursInCompany: number | null
    Category: number
    Status: number
    LastStatusChange: Date
    IsOnline: boolean
    FlightHoursGrandTotal: number | null
    OnAirSyncedAt: Date | null
}
