import { Prisma } from "@prisma/client";
export type CreateDiscordUserDto = {
    DiscordId: string;
    Username: string;
    Discriminator: string;
    CompanyId: string;
}

export type DiscordUserWithCompany = Prisma.DiscordUserGetPayload<{
    DiscordId: string;
    Username: string;
    Discriminator: string;
    CompanyId: string;
    include: {
      Company: true;
    };
}>;

export type DiscordUser = Prisma.DiscordUserGetPayload<{}>;