export type FlightState = {
    status: FlightStatus;
    hasNotifiedTakeoff: boolean;
}

export const FLIGHT_IN_PROGRESS:FlightStatus = 1;
export const FLIGHT_COMPLETED:FlightStatus = 2;
export const FLIGHT_CANCELLED:FlightStatus = 9;
export const FLIGHT_REGISTERED:FlightStatus = 0;

export type FlightStatus = 0|1|2|9;