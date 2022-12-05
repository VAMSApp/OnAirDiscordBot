-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_aircraftTypeId_fkey";

-- DropIndex
DROP INDEX "Airport_iata_key";

-- AlterTable
ALTER TABLE "Aircraft" ALTER COLUMN "aircraftTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Airport" ALTER COLUMN "iata" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "AircraftType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
