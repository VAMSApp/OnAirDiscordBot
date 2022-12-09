import BaseRepo from './BaseRepo'

class FerryRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.ferry
        this.bot?.log.info('FerryRepo initialized');
    }

}

export const FerryRepo = new FerryRepoClass();

