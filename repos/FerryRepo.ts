import { Prisma } from '@prisma/client';
import { QueryOptions, Ferry } from '../types';
import BaseRepo from './BaseRepo';

export interface IFerryRepo {
    create(newX:any, opts?:QueryOptions): Promise<Ferry>;
    update(Id:any, x:any, opts?:QueryOptions): Promise<Ferry>;
    upsert(Id:any, payload:any, opts?:QueryOptions): Promise<Ferry>;
    findAll(opts?:QueryOptions): Promise<Ferry[]>;
    findById(Id:any, opts?:QueryOptions): Promise<Ferry>;
    findFirst(opts?:QueryOptions): Promise<Ferry>;
}

class FerryRepoClass extends BaseRepo implements IFerryRepo {
    IsSyncable = false;
    
    constructor() {
        super();
        this.Model = this.prisma.ferry;
        this.bot?.log.info('FerryRepo initialized');

        this.findPendingByAircraftId = this.findPendingByAircraftId.bind(this);
    }

    async findPendingByAircraftId(AircraftId:string, opts?:QueryOptions): Promise<Ferry> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            try {

                const query:Prisma.FerryFindFirstArgs = {
                    where: {
                        AircraftId: AircraftId,
                        IsCompleted: false,
                    }
                };

                const ferry:Ferry = await self.Model.findFirst(query);
                resolve(ferry);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export const FerryRepo = new FerryRepoClass();

