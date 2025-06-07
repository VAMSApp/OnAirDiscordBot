import { Company, DiscordUser, Prisma } from "@prisma/client";
import { BaseRepo } from "./BaseRepo";

export type CreateVirtualAirlineDto = {
    Id: string
    InitalOwnerEquity: number
    PercentDividendsToDistribute: number
    Description: string
    LastDividendsDistribution: Date
    LastComputationDate: Date
    ComputedMemberCount: number
    ComputedAircraftsCount: number
    ComputedNumberOfFlights30Days: number
    ComputedNumberOfFlightHours30Days: number
    ComputedMostUsedAirports: string
    Name: string
    Identifier: string
    LastConnection: Date
    LastReportDate: Date
    Reputation: number
    CreationDate: Date
    DifficultyLevel: number
    UTCOffsetinHours: number
    Paused: boolean
    Level: number
    LevelXP: number
    TotalContractsCompleted: number
    TotalContractsEarnedCredits: number
}

export class VirtualAirlineRepo extends BaseRepo {

    async findOne(query: Prisma.VirtualAirlineFindUniqueArgs) {
        const results = await this.prisma.virtualAirline.findUnique(query);

        return results;
    }

    async findMany(query: Prisma.VirtualAirlineFindManyArgs) {
        const results = await this.prisma.virtualAirline.findMany(query);

        return results;
    }

    async findOneById(id: string) {
        const query: Prisma.VirtualAirlineFindUniqueArgs = {
            where: { Id: id }
        }

        const results = await this.prisma.virtualAirline.findUnique(query);
        return results;
    }

    async findOneByIdentifier(identifier: string) {
        const query: Prisma.VirtualAirlineFindUniqueArgs = {
            where: { Identifier: identifier }
        }

        const results = await this.prisma.virtualAirline.findUnique(query);
        return results;
    }

    async create(query: Prisma.VirtualAirlineCreateArgs) {
        const results = await this.prisma.virtualAirline.create(query);

        return results;
    }

    async update(query: Prisma.VirtualAirlineUpdateArgs) {
        const results = await this.prisma.virtualAirline.update(query);
        return results;
    }

    async upsert(query: Prisma.VirtualAirlineUpsertArgs) {
        const results = await this.prisma.virtualAirline.upsert(query);
        return results;
    }
}   