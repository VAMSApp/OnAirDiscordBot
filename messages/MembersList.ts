// import { HumanizeDate } from '../utils';
import Table from 'easy-table';
import { Member as OnAirMember } from 'onair-api';
import { FormatNumberWithCommas, HumanizeDate } from '@/utils';
import { BuildVARoleName } from '@/lib';

export function MembersList (x:OnAirMember[]) {

    if (!x || x.length <= 0) return;
    let response = '';

    const t = new Table;
    x.forEach(function (e:OnAirMember, i:number) {
        const companyName = `${e.Company.Name} (${e.Company.AirlineCode})`;
        const role = BuildVARoleName(e.VARole.Name, e.VARole.Permission);
        const totalPax = e.TotalPAXsTransported;
        const totalCargo = `${FormatNumberWithCommas(e.TotalCargosTransportedLbs.toFixed(2))} lbs`;
        const totalEarnedCredits = `${e.TotalEarnedCredits.toLocaleString('en-US')} 🟡`;
        const rep = `${(e.Company.Reputation*100).toFixed(2)}%`;
        const numFlights = e.NumberOfFlights;
        const lastVAFlight = new Date(e.LastVAFlightDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC',
        }).replace(', ', ' @ ');
        const flightHours = e.FlightHours;
        const humanizedLastFlight = (e.LastVAFlightDate) ? HumanizeDate(e.LastVAFlightDate) : 'Never';
        
        t.cell('#', i+1);
        t.cell('Company', companyName);
        t.cell('Role', role);
        t.cell('Pax', totalPax);
        t.cell('Cargo', totalCargo);
        t.cell('Total Earned Credits', totalEarnedCredits);
        t.cell('Rep', rep);
        t.cell('Flights', `${numFlights} (${flightHours.toFixed(2)})`);
        t.cell('Last Flight', humanizedLastFlight);
        // t.cell('Last Flight', humanizedLastFlight);
        t.newRow();
    });
    const tableStr = t.toString();

    response += `\n${tableStr}`;
    return response;
}
