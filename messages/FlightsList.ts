import Table from 'easy-table';
import { Flight as OnAirFlight } from 'onair-api';
import { DetermineFlightStatus, } from '../lib';

export function FlightsList (x:OnAirFlight[]):string|undefined {
    if (!x) return;
    if (x.length <= 0) return 'No flights';
    const t = new Table;

    x.forEach(function (f:OnAirFlight, i) {
        if (!f) return;
        if (!f.Aircraft) return;
        const identifier = f.Aircraft.Identifier;
        const departureAirport = (f.DepartureAirport) ? f.DepartureAirport.ICAO : '    ';
        const arrivalIntendedAirport = (f.ArrivalIntendedAirport) ? f.ArrivalIntendedAirport.ICAO : '    ';
        const arrivalActualAirport = (f.ArrivalActualAirport) ? f.ArrivalActualAirport.ICAO : '    ';
        const status = DetermineFlightStatus(f);
        const startTime: Date|null = (f.StartTime) ? new Date(f.StartTime) : null;
        const endTime: Date|null = (f.EndTime || f.LandedTime) ? new Date(f.EndTime || f.LandedTime) : null;

        const startTimeString: string = (startTime) ? startTime.toLocaleString('en-US', { timeZone: 'UTC' }) : '';
        const endTimeString: string = (endTime) ? endTime.toLocaleString('en-US', { timeZone: 'UTC' }) : '';

        t.cell('#', i+1);
        t.cell('Aircraft', identifier);
        t.cell('Company', f.Company.AirlineCode);
        t.cell('Status', status);
        t.cell('Start Time', startTimeString);
        t.cell('End Time', endTimeString);
        t.cell('Depart', departureAirport);
        t.cell('Intended Arrival', arrivalIntendedAirport);
        t.cell('Actual Arrival', arrivalActualAirport);
        t.newRow();

    });

    return t.toString();
}
