import Table from 'easy-table'
import { VirtualAirline as OnAirVirtualAirline } from 'onair-api'
import { DetermineWorld } from '../lib'

export function VADetail(x:OnAirVirtualAirline) {
    if (!x) return;

    let detail = ''
    detail += `\n**[${x.AirlineCode}] ${x.Name} Details**\n`
    detail += `\`\`\``
    detail += `  Level: ${x.Level}\n`
    detail += `  XP: ${x.LevelXP} / ${x.Level*1000}\n`
    detail += `  Reputation: ${(x.Reputation * 100).toFixed(2)}%\n`
    detail += `  World: ${DetermineWorld(x.WorldId.toString())}\n`
    detail += `\`\`\``

    return detail

}
