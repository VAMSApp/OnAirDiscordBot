import BaseRepo from './BaseRepo'

class AircraftClassRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.aircraftClass
        this.bot?.log.info('AircraftClassRepo initialized');
    }    
}

export const AircraftClassRepo = new AircraftClassRepoClass();

