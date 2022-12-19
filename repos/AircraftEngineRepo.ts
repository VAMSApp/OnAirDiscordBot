import { Prisma } from '@prisma/client'
import { AircraftEngine, QueryOptions } from '../types'
import BaseRepo from './BaseRepo'

export interface IAircraftEngineRepo {
    create(newX:any, opts?:QueryOptions): Promise<AircraftEngine>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<AircraftEngine>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<AircraftEngine>;
    findAll(opts?:QueryOptions): Promise<AircraftEngine[]>;
    findById(Id:any, opts?:QueryOptions): Promise<AircraftEngine>;
    findFirst(opts?:QueryOptions): Promise<AircraftEngine>;
}


class AircraftEngineRepoClass extends BaseRepo implements IAircraftEngineRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.aircraftEngine
        this.bot?.log.info('AircraftEngineRepo initialized');
    }
}

export const AircraftEngineRepo = new AircraftEngineRepoClass();

