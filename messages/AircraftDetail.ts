import Table from 'easy-table';
import { Aircraft as OnAirAircraft } from 'onair-api';
import { DetermineAircraftStatus, } from '../lib';

export function AircraftDetail (x:OnAirAircraft):string|void {
    if (!x) return;

    const t = new Table;
    const identifier = x.Identifier;
    const currentAirport = (x.CurrentAirport) ? `${x.CurrentAirport.ICAO} - ${x.CurrentAirport.City}, ${x.CurrentAirport.State}` : '';
    const status = DetermineAircraftStatus(x.AircraftStatus);
    const aircraftType = x.AircraftType.AircraftClass.ShortName;
    const maxPayload = x.TotalWeightCapacity;
    const firstSeats = x.ConfigFirstSeats;
    const busSeats = x.ConfigBusSeats;
    const ecoSeats = x.ConfigEcoSeats;
    const aircraftName = x.AircraftType.TypeName;
    
    t.cell('Type', aircraftType);
    t.cell('Identifier', identifier);
    t.cell('Name', aircraftName);
    t.cell('Status', status);
    t.cell('Current Airport', currentAirport);
    t.cell('Max Payload', `${maxPayload} lbs`);
    t.cell('Pax E/B/F', `${ecoSeats}/${busSeats}/${firstSeats}`);
    t.newRow();
    
    return t.toString();
}
