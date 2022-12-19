export type TranslatedMember = {
  Id:                        string;
  VaId?:                      string;
  CompanyId?:                 string;
  VARoleId?:                  string;
  TotalCargosTransportedLbs: number;
  TotalPAXsTransported:      number;
  TotalEarnedCredits:        number;
  TotalSpentCredits:         number;
  NumberOfFlights:           number;
  FlightHours:               number;
  Color:                     string;
  AcceptMigration:           boolean;
  ReputationImpact:          number;
  LastWeeklyPay:             Date|null;
  OnAirSyncedAt?:             Date|null;
  UpdatedAt?:                 Date|null;
  CreatedAt?:                 Date|null;
  Company?:                  any;
  VARole?:                   any;
  VirtualAirline?:           any;
}
