
export type TranslatedEmployee = {
    Id: string;
    Pseudo: string;
    BirthDate?: Date|null;
    CompanyId?: string;
    AccountId?: string;
    CurrentAirportId?: string;
    HomeAirportId?: string;
    FlightHoursTotalBeforeHiring: number|undefined;
    FlightHoursInCompany: number|undefined;
    Category: number;
    Status: number;
    LastStatusChange?: Date|null;
    IsOnline: boolean;
    FlightHoursGrandTotal: number|undefined;
    Company?: any;
    Account?: any;
    CurrentAirport?: any;
    HomeAirport?: any;
    OnAirSyncedAt?: Date|undefined;
}
