import Table from 'easy-table';
import {
    Airport as OnAirAirport,
    Job as OnAirJob,
} from 'onair-api';

export function DetermineRunwaySurface (x:number):string {
    let surface:string = ''

    switch (x) {
        case 0: 
        default:
            surface = 'Unknown/not set'
        break;
        case 3:
            surface = 'Asphalt/grooved'
        break;
        case 7:
            surface = 'Dirt'
        break;
        case 10:
            surface = 'Asphalt - good condition'
        break;
    }   
    
    return surface
}

export function DetermineAirportSize (x:number):string {
    let size:string = ''

    switch (x) {
        case 0:
            size = 'Small'
        break;
        case 1:
            size = 'Medium'
        break;
        case 2:
            size = 'Large'
        break;
    }   
    
    return size
}

export function ArrivalsJobsTable(jobs:OnAirJob[]):string {
    if (!jobs) return ''
    if (jobs.length === 0) return `    No Scheduled Arrivals\n`
    return ''
}

export function DeparturesJobsTable(jobs:OnAirJob[]):string {
    if (!jobs) return ''
    if (jobs.length === 0) return `    No Scheduled Departures\n`
    return ''
}

export function AirportDetail(x:OnAirAirport):string|undefined {
    if (!x) return;
    
    const Name = (x.Name) ? x.Name : ''
    const City = (x.City) ? x.City : ''
    const State = (x.State) ? x.State : ''
    const CountryName = (x.CountryName) ? x.CountryName : ''
    const TransitionAltitude = (x.TransitionAltitude) ? x.TransitionAltitude : ''
    const Size = (x.Size) ? x.Size : ''
    const FullLocation = `${City}, ${State}, ${CountryName}`

    const Latitude = (x.Latitude) ? x.Latitude : ''
    const Longitude = (x.Longitude) ? x.Longitude : ''
    const Elevation = (x.Elevation) ? x.Elevation : ''

    let detail = ''
    detail += `${FullLocation}\n`
    detail += '\`\`\`';
    detail += `AirNav: https://www.airnav.com/airport/${x.ICAO}\n`
    detail += `AOPA: https://www.aopa.org/destinations/airports/${x.ICAO}/details\n`
    detail += `SkyVector: https://skyvector.com/airport/${x.ICAO}\n`
    detail += `Transition Altitude: ${TransitionAltitude}\n`
    detail += `Size: ${Size}\n`
    detail += `Latitude: ${Latitude}\n`
    detail += `Longitude: ${Longitude}\n`
    detail += `Elevation: ${Elevation}\n`
    detail += `\n`
    detail += '\`\`\`';
    detail += `\n`

    detail += `**Runways**`
    detail += `\n`
    detail += '\`\`\`';

    const runwayTable = new Table()
    x.Runways.forEach(r => {
        // const Surface = DetermineRunwaySurface(r.Surface)

        runwayTable.cell('Name', r.Name)
        runwayTable.cell('Type', DetermineRunwaySurface(r.SurfaceType))
        runwayTable.cell('Length', `${r.Length} ft`)
        runwayTable.cell('Hdg', r.MagneticHeading)
        runwayTable.cell('Lat', r.Latitude)
        runwayTable.cell('Lng', r.Longitude)

        if (r.HasIls) {
            runwayTable.cell('ILS Freq', r.IlsFrequency)
            runwayTable.cell('ILS Hdg', r.IlsMagneticHeading)
            runwayTable.cell('ILS Glide Slope', r.IlsSlope)
        }
        runwayTable.newRow();
    })

    detail += runwayTable.toString()
    detail += '\`\`\`';
    detail += `\n`

    detail += `**Arrivals**\n`
    detail += '\`\`\`fix\n';
    detail += 'Not working yet\n'
    // detail += ArrivalsJobsTable([])
    detail += '\`\`\`';
    detail += `\n`

    detail += `**Departals**\n`
    detail += '\`\`\`fix\n';
    detail += 'Not working yet\n'
    // detail += DeparturesJobsTable([])
    detail += '\`\`\`';
    detail += `\n`

    detail
    return detail
}
