import Table from 'easy-table';
import { Cargo, Charter, Job as OnAirJob } from 'onair-api';
import { DetermineJobStatus, DetermineAircraftStatus, } from '../lib';
import moment from 'moment';
import { HumanizeDate } from '../utils';
import { OnAirAirport } from '@/types';

function humanizeExpirationDate(dateStr:string) {
    const isExpired = (moment(dateStr).isBefore(new Date())) ? true : false;

    const humanizedDate = HumanizeDate(dateStr);
    const indicator:string = (isExpired) ? '🛑' : '🕒';
    const humanizedDateStr = (isExpired) ? `${indicator} ${humanizedDate}` : humanizedDate;
    
    return humanizedDateStr;
}

function findAirportById(id:string, job: OnAirJob) {
    let airport = 'N/A';
    if (job.Cargos && job.Cargos.length > 0) {
        const cargo = job.Cargos.find((c: Cargo) => c.DepartureAirportId === id);
        airport = (cargo) ? cargo.DepartureAirport.ICAO : 'N/A';
    } else if (job.Charters && job.Charters.length > 0) {
        const charter = job.Charters.find((c: Charter) => c.DepartureAirportId === id);
        airport = (charter) ? charter.DepartureAirport.ICAO : 'N/A';
    }

    return airport;
}

export function JobsList(x:OnAirJob[]) {
    if (!x) return;
    const t = new Table;

    x.forEach(function (j:OnAirJob) {
        // if the j.Description starts with "Level 00" then it's a level mission, add the trophy icon to the mission type   
        // create regex to check if the description starts with "Level xx" xx is two digit number
        const levelRegex = /^Level \d{2}/;
        const missionType = (j.MissionType) ? j.MissionType.Name : 'N/A';
        const missionTypeWithIcon = (levelRegex.test(j.Description)) ? `🏆 ${missionType}` : missionType;
        t.cell('Type', missionTypeWithIcon);
        t.cell('Pay', (j.Pay) ? `$${j.Pay.toLocaleString()}` : 'N/A');

        const humanizedExpirationDate = (j.ExpirationDate) ? humanizeExpirationDate(j.ExpirationDate) : 'N/A';
        t.cell('Due', humanizedExpirationDate);
        const baseAirport = (j.BaseAirportId) ? findAirportById(j.BaseAirportId, j) : 'N/A';
        t.cell('Base', baseAirport);
        const mainAirport = (j.MainAirportId) ? findAirportById(j.MainAirportId, j) : 'N/A';
        t.cell('Main', mainAirport);

        if (j.Cargos && j.Cargos.length > 0) {
            t.cell('Cargo/Pax', `${j.Cargos.length} leg${(j.Cargos.length > 1) ? 's' : ''}`);
        } else if (j.Charters && j.Charters.length > 0) {
            t.cell('Cargo/Pax', `${j.Charters.length} leg${(j.Charters.length > 1) ? 's' : ''}`);
        }

        // if (j.Cargos && j.Cargos.length > 0) {
        //     t.newRow();

        //     j.Cargos.forEach(function (c:Cargo) {
        //         const departureAirport = (c.DepartureAirport) ? c.DepartureAirport.ICAO : '';
        //         const destinationAirport = (c.DestinationAirport) ? c.DestinationAirport.ICAO : '';
        //         const currentAirport = (c.CurrentAirport) ? c.CurrentAirport.ICAO : '';
        //         const Cargo = c.Weight;
        //         const status = DetermineJobStatus(c);

        //         const AircraftIdentifier = (c.CurrentAircraft) ? `${DetermineAircraftStatus(c.CurrentAircraft.AircraftStatus, true)} ${c.CurrentAircraft.Identifier}` : '      ';

        //         t.cell('Type', ` - ${c.CargoType.Name}`);
        //         t.cell('Cargo/Pax', `${Cargo} lbs`);
        //         t.cell('Status', status);
        //         t.cell('AssignedTo', (c.AssignedToVAMember) ? c.AssignedToVAMember.Company.AirlineCode : '');
        //         t.cell('Aircraft', AircraftIdentifier);
        //         t.cell('Depart', departureAirport);
        //         t.cell('Dest', destinationAirport);
        //         t.cell('Current', currentAirport);
        //         t.cell('Distance', `${c.Distance} NM`);
        //         t.newRow();
        //     });
        // }

        // if (j.Charters && j.Charters.length > 0) {
        //     t.newRow();
        //     j.Charters.forEach(function (c:Charter) {
        //         const Type = ` - ${c.CharterType.Name}`;
        //         const CargoPax = `${c.PassengersNumber}`;
        //         const departureAirport = (c.DepartureAirport) ? c.DepartureAirport.ICAO : '';
        //         const destinationAirport = (c.DestinationAirport) ? c.DestinationAirport.ICAO : '';
        //         const currentAirport = (c.CurrentAirport) ? c.CurrentAirport.ICAO : '';
        //         const JobStatus = DetermineJobStatus(c);
        //         const AircraftIdentifier = (c.CurrentAircraft) ? `${DetermineAircraftStatus(c.CurrentAircraft.AircraftStatus, true)} ${c.CurrentAircraft.Identifier}` : '      ';
        //         const AssignedTo = (c.AssignedToVAMember) ? c.AssignedToVAMember.Company.AirlineCode : '';

        //         t.cell('Type', Type);
        //         t.cell('Cargo/Pax', `${CargoPax} pax`);
        //         t.cell('Status', JobStatus);
        //         t.cell('AssignedTo', AssignedTo);
        //         t.cell('Aircraft', AircraftIdentifier);
        //         t.cell('Depart', departureAirport);
        //         t.cell('Dest', destinationAirport);
        //         t.cell('Current', currentAirport);
        //         t.cell('Distance', `${c.Distance} NM`);
        //         t.newRow();
        //     });
        // }
    });

    t.newRow();
    return t.toString();
}
