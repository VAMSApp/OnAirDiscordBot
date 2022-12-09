import { Prisma } from '@prisma/client'
import { AircraftEngine, QueryOptions } from '../types'
import BaseRepo from './BaseRepo'


class AircraftEngineRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.aircraftEngine
        this.bot?.log.info('AircraftEngineRepo initialized');
    }
}

export const AircraftEngineRepo = new AircraftEngineRepoClass();

