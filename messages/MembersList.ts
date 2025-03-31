// import { HumanizeDate } from '../utils';
import Table from 'easy-table';
import { Member as OnAirMember } from 'onair-api';
import { FormatNumberWithCommas } from '../utils/FormatNumber';

export function MembersList (x:OnAirMember[]) {
    if (!x || x.length <= 0) return;

    const t = new Table;
    x.forEach(function (e:OnAirMember, i:number) {
        const companyName = `${e.Company.Name} (${e.Company.AirlineCode})`;
        const role  = `${e.VARole.Name} (${e.VARole.Permission})`;
        const paxCargo = `${e.TotalPAXsTransported}/${FormatNumberWithCommas(e.TotalCargosTransportedLbs.toFixed(2))}`;
        const rep = `${(e.Company.Reputation*100).toFixed(2)}%`;
        const numFlights = e.NumberOfFlights;
        // const humanizedLastFlight = (e.LastVAFlightDate) ? HumanizeDate(e.LastVAFlightDate) : 'Never';
        
        t.cell('#', i+1);
        t.cell('Company', companyName);
        t.cell('Role', role);
        t.cell('Total Pax/Cargo', paxCargo);
        t.cell('Rep', rep);
        t.cell('Total # Flights', numFlights);
        // t.cell('Last Flight', humanizedLastFlight);
        t.newRow();
    });
    
    return t.toString();
}
