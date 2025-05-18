import { OnAirCompanyDetail, } from '@/types';
import { DetermineWorld } from '@/lib';
import { FormatDate, FormatNumberWithCommas, HumanizeDate } from '@/utils';

export function CompanyDetail(x:OnAirCompanyDetail) {
    if (!x) return;
    let detail = '';

    const createdOn = (x.CreationDate) ? FormatDate(x.CreationDate, 'MMMM Do YYYY') : 'Unknown';
    const lastConnection = (x.LastConnection) ? HumanizeDate(x.LastConnection) : 'Unknown';
    
    detail += `\n**[${x.AirlineCode}] ${x.Name} Details**\n`;
    detail += '```';
    detail += `  Level: ${x.Level}\n`;
    detail += `  XP: ${x.LevelXP} / ${x.Level*1000}\n`;
    detail += `  Reputation: ${(x.Reputation * 100).toFixed(2)}%\n`;
    detail += `  World: ${DetermineWorld(x.WorldId.toString())}\n`;
    detail += `  Created On: ${createdOn}\n`;
    detail += `  Last Connected: ${lastConnection}\n`;

    if (x.EmployeeCount) {
        detail += `  Members: ${x.EmployeeCount}\n`;
    }

    if (x.FleetCount) {
        detail += `  Fleet: ${FormatNumberWithCommas(x.FleetCount)}\n`;
    }

    if (x.FlightCount) {
        detail += `  Flights: ${FormatNumberWithCommas(x.FlightCount)}\n`;
    }

    if (x.FlightHours) {
        detail += `  Cumulative Flight Hours: ${FormatNumberWithCommas(x.FlightHours)}\n`;
    }
    detail += '```';

    return detail;

}
