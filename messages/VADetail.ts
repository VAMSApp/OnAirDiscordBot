import { VirtualAirlineWithRelations } from '@/repos/VirtualAirlineRepo';
import { FormatDate, HumanizeDate } from '../utils';

export function VADetail(x:VirtualAirlineWithRelations) {
    if (!x) return;
    let detail = '';
    const createdOn = (x.CreationDate) ? FormatDate(x.CreationDate, 'MMMM Do YYYY') : 'Unknown';
    const lastConnection = (x.LastConnection) ? HumanizeDate(x.LastConnection) : 'Unknown';
    detail += `\n**[${x.AirlineCode}] ${x.Name} Details**\n`;
    detail += '```';
    if (x.Level) {
        detail += `  Level: ${x.Level}\n`;
    }
    
    if (x.Level && x.LevelXP) {
        detail += `  XP: ${x.LevelXP} / ${x.Level*1000}\n`;
    }

    
    if (x.Reputation) {
        detail += `  Reputation: ${(x.Reputation * 100).toFixed(2)}%\n`;
    }

    
    if (x.World) {
        detail += `  World: ${x.World.Name}\n`;
    }

    detail += `  Created On: ${createdOn}\n`;
    detail += `  Last Connected: ${lastConnection}\n`;
    
    detail += `  Members: ${x.MemberCount}\n`;
    detail += '```';

    return detail;

}
