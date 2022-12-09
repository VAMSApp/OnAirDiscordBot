/*
  Warnings:

  - You are about to drop the column `RentaAirportId` on the `Aircraft` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_RentaAirportId_fkey";

-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "RentaAirportId",
ADD COLUMN     "RentalAirportId" TEXT;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_RentalAirportId_fkey" FOREIGN KEY ("RentalAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
