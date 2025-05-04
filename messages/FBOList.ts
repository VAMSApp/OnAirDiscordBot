import Table from 'easy-table';
import { Fbo as OnAirFbo } from 'onair-api';

export function FBOList (x:OnAirFbo[]):string|void {
    if (!x) return;
    if (x.length <= 0) return;

    const t = new Table;
    let response = '';
    
    x.forEach((f: OnAirFbo, i: number) => {
        const name = `${(f.WorkshopUnderConstruction) ? '🚧 '+f.Name : f.Name}`;
        const airport = f.Airport.ICAO;
        const location = `${f.Airport.City}, ${f.Airport.State}`
        const CargoWeightCapacity = f.CargoWeightCapacity;
        const Fuel100LLCapacity = f.Fuel100LLCapacity;
        const Fuel100LLQuantity = f.Fuel100LLQuantity;
        const Fuel100LLSellPrice = f.Fuel100LLSellPrice;
        const FuelJetCapacity = f.FuelJetCapacity;
        const FuelJetQuantity = f.FuelJetQuantity;
        const FuelJetSellPrice = f.FuelJetSellPrice;
        const WorkshopUnderConstruction = f.WorkshopUnderConstruction;
        const AllowFuel100LLSelling = (f.AllowFuel100LLSelling && f.Fuel100LLQuantity > 0) ? '✅' : '❌';
        const AllowFuelJetSelling = (f.AllowFuelJetSelling && f.FuelJetQuantity > 0) ? '✅' : '❌';
        const fuelAvailable = (f.AllowFuel100LLSelling) ? `${AllowFuel100LLSelling} ${f.Fuel100LLQuantity.toFixed(2)}/${f.Fuel100LLCapacity} ($${f.Fuel100LLSellPrice.toFixed(2)}/per gal)` : `${AllowFuel100LLSelling} ${f.Fuel100LLQuantity.toFixed(2)}/${f.Fuel100LLCapacity}`;
        const fuelJetAvailable = (f.AllowFuelJetSelling) ? `${AllowFuelJetSelling} ${f.FuelJetQuantity.toFixed(2)}/${f.FuelJetCapacity} ($${f.FuelJetSellPrice.toFixed(2)}/per gal)` : `${AllowFuelJetSelling} ${f.FuelJetQuantity.toFixed(2)}/${f.FuelJetCapacity}`;
    
        t.cell('#', i+1);
        t.cell('Name', name);
        t.cell('Airport', airport);
        t.cell('City, State', location);
        t.cell('Cargo Capacity (lbs)', f.CargoWeightCapacity.toLocaleString('en-US'));
        t.cell('⛽ Avail/Cap (Sell Price)', fuelAvailable);
        t.cell('✈️⛽ Avail/Cap (Sell Price)', fuelJetAvailable);
    
        t.newRow();
    });
    
    const tableStr = t.toString();
    response += `\n\n${tableStr}`;
    response += `\nLegend:`;
    response += `\n- 🚧: Workshop Under Construction`
    response += `\n- ✅: Fuel Selling Enabled`
    response += `\n- ❌: Fuel Selling Disabled`
    response += `\n- ⛽: 100LL Fuel`
    response += `\n- ✈️⛽: Jet Fuel`
    
    return response;
}