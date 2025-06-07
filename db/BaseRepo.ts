import { PrismaClient } from "@prisma/client";

export interface IBaseRepo {
    prisma: PrismaClient;
}

export class BaseRepo {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
}