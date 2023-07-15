// import { HumanizeDate } from '../utils';
import Table from 'easy-table';
import { FormatNumberWithCommas } from '../utils/FormatNumber';
import { MemberWithRelations } from '@/repos';
import { Member as OnAirMember, } from 'onair-api';

function RoleEmoji (role:number):string {
    switch (role) {
    case 0:
        return '👑';
    case 100:
    case 200:
    case 300:
    case 400:
        return '👨‍✈️';
    case 500:
    default:
        return '🍆';
    }

}

export function MembersList (x:MemberWithRelations[]|OnAirMember[]):string|void {
    if (!x || x.length <= 0) return;

    try {
        const t = new Table;

        x.forEach(function (e:MemberWithRelations|OnAirMember, i:number) {
            t.cell('#', i+1);

            const companyName = `${e.Company.Name} (${e.Company.AirlineCode})`;
            t.cell('Company', companyName);
            
            if (e.VARole) {
                const role  = `${RoleEmoji(e.VARole.Permission)} ${e.VARole.Name}`;
                t.cell('Role', role);
            }

            const paxCargo = `${e.TotalPAXsTransported}/${FormatNumberWithCommas(e.TotalCargosTransportedLbs.toFixed(2))}`;
            t.cell('Total Pax/Cargo', paxCargo);

            const rep = `${(e.ReputationImpact*100).toFixed(2)}%`;
            t.cell('Rep', rep);

            const numFlights = e.NumberOfFlights;
            t.cell('# Flights', numFlights);

            const flightHours = e.FlightHours.toFixed(2);
            t.cell('Flight Hrs', flightHours);

            t.newRow();
        });
        
        return t.toString();

    } catch (err) {
        console.error(err);
        return;
    }
}
