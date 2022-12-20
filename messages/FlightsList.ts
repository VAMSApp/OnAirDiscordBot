import Table from 'easy-table'
import { Flight as OnAirFlight } from 'onair-api';
import { DetermineFlightStatus, } from '../lib'

export function FlightsList (x:OnAirFlight[]) {
    if (!x) return;
    if (x.length <= 0) return 'No flights'
    let t = new Table;

    x.forEach(function (f:OnAirFlight, i) {
        const identifier = f.Aircraft.Identifier
        const departureAirport = (f.DepartureAirport) ? f.DepartureAirport.ICAO : '    '
        const arrivalIntendedAirport = (f.ArrivalIntendedAirport) ? f.ArrivalIntendedAirport.ICAO : '    '
        const arrivalActualAirport = (f.ArrivalActualAirport) ? f.ArrivalActualAirport.ICAO : '    '
        const status = DetermineFlightStatus(f)
        
        t.cell('#', i+1)
        t.cell('Aircraft', identifier)
        t.cell('Company', f.Company.AirlineCode)
        t.cell('Status', status)
        t.cell('Start Time', f.StartTime)
        t.cell('End Time', f.EndTime)
        t.cell('Depart', departureAirport)
        t.cell('Intended Arrival', arrivalIntendedAirport)
        t.cell('Actual Arrival', arrivalActualAirport)
        t.newRow()

    });

    return t.toString()
}
