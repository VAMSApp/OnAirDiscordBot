/*
  Warnings:

  - You are about to drop the column `rentCompanyGuid` on the `Aircraft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "rentCompanyGuid",
ADD COLUMN     "rentalmpanyGuid" TEXT,
ALTER COLUMN "rentCautionAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fuelWeight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "altitude" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "loadedWeight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "extraWeightCapacity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalWeightCapacity" SET DATA TYPE DOUBLE PRECISION;
