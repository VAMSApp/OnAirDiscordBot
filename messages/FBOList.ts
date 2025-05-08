import Table from 'easy-table';
import { Fbo as OnAirFbo } from 'onair-api';

export function FBOList (x:OnAirFbo[]):string|void {
    if (!x) return;
    if (x.length <= 0) return;

    const t = new Table;
    let response = '';
    
    x.forEach((f: OnAirFbo, i: number) => {
        let name = `${(f.WorkshopUnderConstruction) ? '🚧 '+f.Name : f.Name}`;
        let services: string[] = [];

        const airport = f.Airport.ICAO;
        const location = `${f.Airport.City}, ${f.Airport.State}`
        const CargoWeightCapacity = f.CargoWeightCapacity;


        const Fuel100LLCapacity = f.Fuel100LLCapacity.toLocaleString('en-US');
        const Fuel100LLQuantity = f.Fuel100LLQuantity.toLocaleString('en-US');
        const Fuel100LLSellPrice = f.Fuel100LLSellPrice.toLocaleString('en-US');

        const FuelJetCapacity = f.FuelJetCapacity.toLocaleString('en-US');
        const FuelJetQuantity = f.FuelJetQuantity.toLocaleString('en-US');
        const FuelJetSellPrice = f.FuelJetSellPrice.toLocaleString('en-US');

        const AllowFuel100LLSelling = (f.AllowFuel100LLSelling && f.Fuel100LLQuantity > 0) ? '✅' : '❌';
        const AllowFuelJetSelling = (f.AllowFuelJetSelling && f.FuelJetQuantity > 0) ? '✅' : '❌';
        
        const fuelAvailable = (f.AllowFuel100LLSelling) ? `${AllowFuel100LLSelling} ${Fuel100LLQuantity}/${Fuel100LLCapacity} (${Fuel100LLSellPrice}/per gal)` : `${AllowFuel100LLSelling} ${Fuel100LLQuantity}/${Fuel100LLCapacity}`;
        
        const fuelJetAvailable = (f.AllowFuelJetSelling) ? `${AllowFuelJetSelling} ${FuelJetQuantity}/${FuelJetCapacity} ($${FuelJetSellPrice}/per gal)` : `${AllowFuelJetSelling} ${FuelJetQuantity}/${FuelJetCapacity}`;

        const AircraftTieDownCapacity = f.AircraftTieDownCapacity;
        const AircraftHangarCapacity = f.AircraftHangarCapacity;
        const WorkshopSEP = f.WorkshopSEP;
        const WorkshopMEP = f.WorkshopMEP;
        const WorkshopTurboProp = f.WorkshopTurboProp;
        const WorkshopJet = f.WorkshopJet;
        const WorkshopHeavyJet = f.WorkshopHeavyJet;
        const WorkshopHelicopter = f.WorkshopHelicopter;
        const WorkshopAnnualSEP = f.WorkshopAnnualSEP;
        const WorkshopAnnualMEP = f.WorkshopAnnualMEP;
        const WorkshopAnnualTurboProp = f.WorkshopAnnualTurboProp;
        const WorkshopAnnualJet = f.WorkshopAnnualJet;
        const WorkshopAnnualHeavyJet = f.WorkshopAnnualHeavyJet;
        const WorkshopAnnualHelicopter = f.WorkshopAnnualHelicopter;
        
        if (f.AllowFuel100LLSelling) services.push('⛽');
        if (f.AllowFuelJetSelling) services.push('✈️⛽');

        // if the FBO has a workshop for any of the types (SEP, MEP, TurboProp, Jet, HeavyJet, Helicopter) then add the emoji to the name
        if (WorkshopSEP || WorkshopMEP || WorkshopTurboProp || WorkshopJet || WorkshopHeavyJet || WorkshopHelicopter || WorkshopAnnualSEP || WorkshopAnnualMEP || WorkshopAnnualTurboProp || WorkshopAnnualJet || WorkshopAnnualHeavyJet || WorkshopAnnualHelicopter) {
            services.push('🛠️');
        }

        if (AircraftHangarCapacity > 0 || AircraftTieDownCapacity > 0) {
            services.push('🛩️');
            services.push('🛩️🏠');
        }

        t.cell('#', i+1);
        t.cell('Name', name);
        t.cell('Services', services.join('|'));
        t.cell('Airport', airport);
        t.cell('City, State', location);
        t.cell('Cargo (lbs)', f.CargoWeightCapacity.toLocaleString('en-US'));
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
    response += `\n- 🛠️: Workshop Available`
    response += `\n- 🛩️: Aircraft Tie Down`
    response += `\n- 🛩️🏠: Aircraft Hangar`

    return response;
}