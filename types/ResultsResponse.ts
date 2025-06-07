import { Company, DiscordUser } from '@prisma/client';

export type ResultsResponse = Company|Company[]|DiscordUser|DiscordUser[]
