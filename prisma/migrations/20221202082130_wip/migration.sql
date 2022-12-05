/*
  Warnings:

  - You are about to drop the column `rentalmpanyGuid` on the `Aircraft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "rentalmpanyGuid",
ADD COLUMN     "rentalCompanyGuid" TEXT;
