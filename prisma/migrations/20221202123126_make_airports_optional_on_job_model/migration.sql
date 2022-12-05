-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_baseAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_mainAirportId_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "mainAirportGuid" DROP NOT NULL,
ALTER COLUMN "mainAirportId" DROP NOT NULL,
ALTER COLUMN "baseAirportGuid" DROP NOT NULL,
ALTER COLUMN "baseAirportId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_mainAirportId_fkey" FOREIGN KEY ("mainAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_baseAirportId_fkey" FOREIGN KEY ("baseAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
