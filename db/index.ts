import { DiscordUserRepo } from './DiscordUserRepo';
import { CompanyRepo } from './CompanyRepo';
import { VirtualAirlineRepo } from './VirtualAirlineRepo';


export const discordUserRepo = new DiscordUserRepo();
export const companyRepo = new CompanyRepo();
export const virtualAirlineRepo = new VirtualAirlineRepo();

export interface IDatabaseRepositories {
    DiscordUserRepo: DiscordUserRepo;
    CompanyRepo: CompanyRepo;
    VirtualAirlineRepo: VirtualAirlineRepo;
}

export default {
    DiscordUserRepo: discordUserRepo,
    CompanyRepo: companyRepo,
    VirtualAirlineRepo: virtualAirlineRepo,
} as IDatabaseRepositories;