import BaseRepo from './BaseRepo'

class VirtualAirlineRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super();
        this.Model = this.prisma.virtualAirline
        this.bot?.log.info('VirtualAirlineRepo initialized');
        this.findByOwnerId = this.findByOwnerId.bind(this)
    }

    async findByOwnerId(OwnerId:string, opts:any) {
        const self = this;
        if (!OwnerId) throw new Error('OwnerId is required');

        const query = {
            where: {
                OwnerId: OwnerId
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

export const VirtualAirlineRepo = new VirtualAirlineRepoClass();

