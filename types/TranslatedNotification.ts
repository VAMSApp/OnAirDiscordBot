 export type TranslatedNotification = {
    Id: string
    VirtualAirlineId?: string;
    CompanyId?: string | null;
    AircraftId?: string | null;
    FlightId?: string | null;
    EmployeeId?: string | null;
    IsRead: boolean;
    IsNotification: boolean;
    ZuluEventTime: Date;
    CategoryId: number;
    ActionId: number;
    Description: string;
    Amount: number;
    OnAirSyncedAt?: Date | null;
    UpdatedAt?: Date | null;
    CreatedAt?: Date;
    Company?: any;
    Aircraft?: any;
    Flight?: any;
    Employee?: any;
    Category?: any;
    Action?: any;
    VirtualAirline?: any;
  }
