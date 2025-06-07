import { Prisma, } from "@prisma/client";
import { BaseRepo } from "./BaseRepo";
import { DiscordUserWithCompany } from "@/types/DiscordUser";

export class DiscordUserRepo extends BaseRepo {

    async findOne(query: Prisma.DiscordUserFindUniqueArgs) {
        const results = await this.prisma.discordUser.findUnique(query);

        return results;
    }

    async findMany(query: Prisma.DiscordUserFindManyArgs) {
        const results = await this.prisma.discordUser.findMany(query);

        return results;
    }

    async findOneByDiscordId(discordId: string): Promise<DiscordUserWithCompany | null> {
        const query = {
            where: { DiscordId: discordId },
            include: {
                Company: true,
            }
        } satisfies Prisma.DiscordUserFindUniqueArgs;

        const results = await this.prisma.discordUser.findUnique(query);

        return results as DiscordUserWithCompany | null;
    }

    async findOneByCompanyId(companyId: string) {
        const query: Prisma.DiscordUserFindUniqueArgs = {
            where: { CompanyId: companyId }
        }

        const results = await this.prisma.discordUser.findUnique(query);

        return results;
    }

    async create(query: Prisma.DiscordUserCreateArgs) {
        const results = await this.prisma.discordUser.create(query);

        return results;
    }

    async update(query: Prisma.DiscordUserUpdateArgs) {
        const results = await this.prisma.discordUser.update(query);

        return results;
    }

    async delete(query: Prisma.DiscordUserDeleteArgs) {
        const results = await this.prisma.discordUser.delete(query);

        return results;
    }

    async deleteByDiscordId(discordId: string) {
        const results = await this.prisma.discordUser.delete({
            where: {
                DiscordId: discordId
            }
        });

        return results;
    }
}