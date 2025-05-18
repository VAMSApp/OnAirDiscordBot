import {
    BalanceSheetResponse,
    VirtualAirlineResponse,
    FlightResponse,
    AirportResponse,
    FboResponse,
    CompanyResponse,
    JobResponse,
    CashFlowResponse,
    MemberResponse,
    FlightTrackResponse,
    NotificationResponse,
    EmployeeResponse,
    ShareHolderResponse,
    WorkOrderResponse,
    VARoleResponse,
    Notification,
    VARole,
    Fbo,
    Aircraft,
    Airport,
    Flight,
    VirtualAirline,
    Member,
    Company,
    People,
    Job,
} from 'onair-api';

export type OnAirAircraft = Aircraft;
export type OnAirFlight = Flight;
export type OnAirVirtualAirline = VirtualAirline;
export type OnAirMember = Member;
export type OnAirCompany = Company;
export type OnAirEmployee = People;
export type OnAirNotification = Notification;
export type OnAirVARole = VARole;
export type OnAirFbo = Fbo;
export type OnAirJob = Job;
export type OnAirBalanceSheet = BalanceSheetResponse;
export type OnAirAirport = Airport;

export type OnAirVirtualAirlineDetail = OnAirVirtualAirline & {
    MemberCount:number;
    Members: OnAirMember[]
    FleetCount:number;
    FlightCount:number;
    FlightHours:number;
}

export type OnAirCompanyDetail = OnAirCompany & {
    EmployeeCount:number;
    Employees: OnAirEmployee[]
    FleetCount:number;
    FlightCount:number;
    FlightHours:number;
}

