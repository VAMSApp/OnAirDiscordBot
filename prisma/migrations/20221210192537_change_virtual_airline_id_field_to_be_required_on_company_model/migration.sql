/*
  Warnings:

  - Made the column `VirtualAirlineId` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_VirtualAirlineId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "VirtualAirlineId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_VirtualAirlineId_fkey" FOREIGN KEY ("VirtualAirlineId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
