import { Prisma } from '@prisma/client';
import { IBot } from '../interfaces';
import OnAir from 'OnAir';
import { AirportTranslator } from '../translators';
import { Airport, TranslatedAirport } from 'types';
import BaseRepo from './BaseRepo'

class AirportRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.airport
        this.bot?.log.info('AirportRepo initialized');
        this.findByCode = this.findByCode.bind(this)
        this.findOrUpsertByCode = this.findOrUpsertByCode.bind(this)
    }

    async findByCode(icao:string, opts:any) {
        const self = this;
        if (!icao) throw new Error('ICAO is required');

        const query = {
            where: {
                ICAO: icao
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findUnique(query)
            .then((x:any) => self.determineCanSync(x))
            .then((x:any) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x:any) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x:any) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findOrUpsertByCode(icao:string, opts:any, app:IBot):Promise<Airport> {
        const self = this;
        if (!icao) throw new Error('ICAO is required');

        let x:Airport = await self.findByCode(icao, opts)

        if (!x) {
            // airport not found, so we need to look it up in OnAir
            const oaAirport = await app.OnAir.getAirport(icao);
            if (!oaAirport) throw new Error(`Airport with ICAO ${icao} not found in OnAir`);
            // translate the OnAir airport to a DB Airport
            const translatedAirport:TranslatedAirport = new AirportTranslator(app).translate(oaAirport)
            // create the airport in the DB
            x = await self.create(translatedAirport, opts);
        }

        // return the airport
        return x;
    }

}

export const AirportRepo = new AirportRepoClass();

