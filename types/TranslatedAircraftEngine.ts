export type TranslatedAircraftEngine = {
    Id: string
    AircraftId?: string
    Number: number
    Condition: number
    MaxCondition: number
    EngineHours: number
    LastCheckup?: Date
    Aircraft?: any;
}
