import BaseRepo from './BaseRepo'

class AircraftTypeRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.aircraftType
        this.bot?.log.info('AircraftTypeRepo initialized');
    }    
}

export const AircraftTypeRepo = new AircraftTypeRepoClass();

