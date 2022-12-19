-- AlterTable
ALTER TABLE "Ferry" ADD COLUMN     "DepartureAirportId" TEXT;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "CreatedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ferry" ADD CONSTRAINT "Ferry_DepartureAirportId_fkey" FOREIGN KEY ("DepartureAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
