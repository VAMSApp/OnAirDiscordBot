import { AircraftType, QueryOptions } from '../types';
import BaseRepo from './BaseRepo'

export interface IAircraftTypeRepo {
    create(newX:any, opts?:QueryOptions): Promise<AircraftType>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<AircraftType>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<AircraftType>;
    findAll(opts?:QueryOptions): Promise<AircraftType[]>;
    findById(Id:any, opts?:QueryOptions): Promise<AircraftType>;
    findFirst(opts?:QueryOptions): Promise<AircraftType>;
}

class AircraftTypeRepoClass extends BaseRepo implements IAircraftTypeRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.aircraftType
        this.bot?.log.info('AircraftTypeRepo initialized');
    }    
}

export const AircraftTypeRepo = new AircraftTypeRepoClass();

