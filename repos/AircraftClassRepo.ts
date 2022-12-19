import { AircraftClass, QueryOptions } from '../types';
import BaseRepo from './BaseRepo'

export interface IAircraftClassRepo {
    create(newX:any, opts?:QueryOptions): Promise<AircraftClass>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<AircraftClass>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<AircraftClass>;
    findAll(opts?:QueryOptions): Promise<AircraftClass[]>;
    findById(Id:any, opts?:QueryOptions): Promise<AircraftClass>;
    findFirst(opts?:QueryOptions): Promise<AircraftClass>;
}

class AircraftClassRepoClass extends BaseRepo implements IAircraftClassRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.aircraftClass
        this.bot?.log.info('AircraftClassRepo initialized');
    }    
}

export const AircraftClassRepo = new AircraftClassRepoClass();

