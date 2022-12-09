import BaseRepo from './BaseRepo'

class CompanyRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.company
        this.bot?.log.info('CompanyRepo initialized');
        this.findByAirlineCode = this.findByAirlineCode.bind(this)
    }

    async findByAirlineCode(AirlineCode:string, opts:any) {
        const self = this;
        if (!AirlineCode) throw new Error('AirlineCode is required');

        const query = {
            where: {
                AirlineCode: AirlineCode
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
    
}

export const CompanyRepo = new CompanyRepoClass();

