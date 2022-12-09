
export type Ferry = {
  Id: string
  AccountId: string
  AircraftId: string
  DepartureAirportId: string
  ArrivalAirportId: string
  IsCompleted: boolean
  CompletedBy: string | null
  CompletedAt: Date | null
  UpdatedAt: Date | null
  CreatedAt: Date
}
