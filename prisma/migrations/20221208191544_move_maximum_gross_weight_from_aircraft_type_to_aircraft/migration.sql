/*
  Warnings:

  - You are about to drop the column `MaximumGrossWeight` on the `AircraftType` table. All the data in the column will be lost.
  - Added the required column `MaximumGrossWeight` to the `Aircraft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aircraft" ADD COLUMN     "MaximumGrossWeight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AircraftType" DROP COLUMN "MaximumGrossWeight";
