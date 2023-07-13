import { VirtualAirlineDetail } from 'commands/detail';
import { DetermineWorld } from '../lib';
import { FormatDate, HumanizeDate } from '../utils';

export function VADetail(x:VirtualAirlineDetail) {
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
    detail += `  Members: ${x.MemberCount}\n`;
    detail += '```';

    return detail;

}
