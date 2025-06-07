import { Company, DiscordUser, Prisma } from "@prisma/client";
import { BaseRepo } from "./BaseRepo";

export type CreateCompanyDto = {
    Name: string
    Identifier: string
    LastConnection: Date
    LastReportDate: Date
    Reputation: number
    CreationDate: Date
    DifficultyLevel: number
    Paused: boolean
    Level: number
    LevelXP: number
    LastRefresh: Date
    OwnerId?: string
    VirtualAirlineId?: string
}

export class CompanyRepo extends BaseRepo {

    async findOne(query: Prisma.CompanyFindUniqueArgs) {
        const results = await this.prisma.company.findUnique(query);

        return results;
    }

    async findMany(query: Prisma.CompanyFindManyArgs) {
        const results = await this.prisma.company.findMany(query);

        return results;
    }

    async findOneById(id: string) {
        const query: Prisma.CompanyFindUniqueArgs = {
            where: { Id: id }
        }

        const results = await this.prisma.company.findUnique(query);
        return results;
    }

    async findOneByOwnerId(ownerId: string) {
        const query: Prisma.CompanyFindUniqueArgs = {
            where: { OwnerId: ownerId }
        }

        const results = await this.prisma.company.findUnique(query);
        return results;
    }

    async findOneByIdentifier(identifier: string) {
        const query: Prisma.CompanyFindUniqueArgs = {
            where: { Identifier: identifier }
        }

        const results = await this.prisma.company.findUnique(query);
        return results;
    }

    async create(query: Prisma.CompanyCreateArgs) {
        const results = await this.prisma.company.create(query);

        return results;
    }

    async update(query: Prisma.CompanyUpdateArgs) {
        const results = await this.prisma.company.update(query);
        return results;
    }

    async upsert(query: Prisma.CompanyUpsertArgs) {
        const results = await this.prisma.company.upsert(query);

        
        return results;
    }
}   