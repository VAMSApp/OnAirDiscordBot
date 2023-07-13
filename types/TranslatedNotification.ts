export type ConnectByIdString = {
    connect : {
        Id: string;
    }
}
export type ConnectByIdNumber = {
    connect : {
        Id: number;
    }
}

export type TranslatedNotification = {
    Id: string
    IsRead: boolean;
    IsNotification: boolean;
    ZuluEventTime: Date;
    Description: string;
    Amount: number;
    OnAirSyncedAt?: Date | null;
    UpdatedAt?: Date | null;
    CreatedAt?: Date;
    Company?: ConnectByIdString;
    Aircraft?: ConnectByIdString;
    Flight?: ConnectByIdString;
    Employee?: ConnectByIdString;
    Category?: ConnectByIdNumber;
    Action?: ConnectByIdNumber;
    VirtualAirline?: ConnectByIdString;
  }
