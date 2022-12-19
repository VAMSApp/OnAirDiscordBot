import { IBotContext, ILogger, IAircraftClassTranslator, IVARoleTranslator, IAircraftTypeTranslator, IAircraftEngineTranslator, IAircraftTranslator, IProcessor, IVirtualAirlineTranslator, ITranslator, IMemberTranslator, ICompanyTranslator, IAirportTranslator, INotificationTranslator, IFlightTranslator, IEmployeeTranslator, } from "../interfaces";
import { AircraftClassTranslator, AircraftTypeTranslator, AircraftEngineTranslator, AircraftTranslator, VirtualAirlineTranslator } from "../translators";
import { TranslatedResponse, InputResponse, } from "../types";

export class BaseProcessor implements IProcessor {
    App: IBotContext;
    Logger: ILogger;
    Input: InputResponse|undefined;
    Translated: TranslatedResponse|undefined;
    Translators: {
        AircraftClass: IAircraftClassTranslator;
        AircraftType: IAircraftTypeTranslator;
        AircraftEngine: IAircraftEngineTranslator;
        Aircraft: IAircraftTranslator;
        VirtualAirline: IVirtualAirlineTranslator;
        Member: IMemberTranslator;
        Company: ICompanyTranslator;
        VARole: IVARoleTranslator;
        Airport: IAirportTranslator;
        Notification: INotificationTranslator;
        Flight: IFlightTranslator;
        Employee: IEmployeeTranslator;
    };

    constructor(app: IBotContext) {
        this.App = app;
        this.Translators = this.App.OnAir.Translators;
        
        const {
            log,
            OnAir: {
                ...OnAir
            },        
        } = this.App;

        this.Logger = log;
    }

}

export default BaseProcessor;
