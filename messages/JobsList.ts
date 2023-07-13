import Table from 'easy-table';
import { Cargo, Charter, Job as OnAirJob } from 'onair-api';
import { DetermineJobStatus, DetermineAircraftStatus, } from '../lib';
import moment from 'moment';
import { HumanizeDate } from '../utils';

function humanizeExpirationDate(dateStr:string) {
    const isExpired = (moment(dateStr).isBefore(new Date())) ? true : false;

    const humanizedDate = HumanizeDate(dateStr);
    const indicator:string = (isExpired) ? '🛑' : '🕒';
    const humanizedDateStr = (isExpired) ? `${indicator} ${humanizedDate}` : humanizedDate;
    
    return humanizedDateStr;
}

export function JobsList(x:OnAirJob[]) {
    if (!x) return;
    const t = new Table;

    x.forEach(function (j:OnAirJob) {
        const missionType = j.MissionType.Name;
        t.cell('Type', missionType);
        t.cell('Pay', `$${j.Pay.toLocaleString()}`);
        const humanizedExpirationDate = humanizeExpirationDate(j.ExpirationDate);
        t.cell('Due', humanizedExpirationDate);

        if (j.Cargos && j.Cargos.length > 0) {
            t.cell('Cargo/Pax', `${j.Cargos.length} leg${(j.Cargos.length > 1) ? 's' : ''}`);
        } else if (j.Charters && j.Charters.length > 0) {
            t.cell('Cargo/Pax', `${j.Charters.length} leg${(j.Charters.length > 1) ? 's' : ''}`);
        }

        if (j.Cargos && j.Cargos.length > 0) {
            t.newRow();

            j.Cargos.forEach(function (c:Cargo) {
                const departureAirport = (c.DepartureAirport) ? c.DepartureAirport.ICAO : '';
                const destinationAirport = (c.DestinationAirport) ? c.DestinationAirport.ICAO : '';
                const currentAirport = (c.CurrentAirport) ? c.CurrentAirport.ICAO : '';
                const Cargo = c.Weight;
                const status = DetermineJobStatus(c);

                const AircraftIdentifier = (c.CurrentAircraft) ? `${DetermineAircraftStatus(c.CurrentAircraft.AircraftStatus, true)} ${c.CurrentAircraft.Identifier}` : '      ';

                t.cell('Type', ` - ${c.CargoType.Name}`);
                t.cell('Cargo/Pax', `${Cargo} lbs`);
                t.cell('Status', status);
                t.cell('AssignedTo', (c.AssignedToVAMember) ? c.AssignedToVAMember.Company.AirlineCode : '');
                t.cell('Aircraft', AircraftIdentifier);
                t.cell('Depart', departureAirport);
                t.cell('Dest', destinationAirport);
                t.cell('Current', currentAirport);
                t.cell('Distance', `${c.Distance} NM`);
                t.newRow();
            });
        }

        if (j.Charters && j.Charters.length > 0) {
            t.newRow();
            j.Charters.forEach(function (c:Charter) {
                const Type = ` - ${c.CharterType.Name}`;
                const CargoPax = `${c.PassengersNumber}`;
                const departureAirport = (c.DepartureAirport) ? c.DepartureAirport.ICAO : '';
                const destinationAirport = (c.DestinationAirport) ? c.DestinationAirport.ICAO : '';
                const currentAirport = (c.CurrentAirport) ? c.CurrentAirport.ICAO : '';
                const JobStatus = DetermineJobStatus(c);
                const AircraftIdentifier = (c.CurrentAircraft) ? `${DetermineAircraftStatus(c.CurrentAircraft.AircraftStatus, true)} ${c.CurrentAircraft.Identifier}` : '      ';
                const AssignedTo = (c.AssignedToVAMember) ? c.AssignedToVAMember.Company.AirlineCode : '';

                t.cell('Type', Type);
                t.cell('Cargo/Pax', `${CargoPax} pax`);
                t.cell('Status', JobStatus);
                t.cell('AssignedTo', AssignedTo);
                t.cell('Aircraft', AircraftIdentifier);
                t.cell('Depart', departureAirport);
                t.cell('Dest', destinationAirport);
                t.cell('Current', currentAirport);
                t.cell('Distance', `${c.Distance} NM`);
                t.newRow();
            });
        }
    });

    t.newRow();
    return t.toString();
}
