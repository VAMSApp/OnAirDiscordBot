/*
  Warnings:

  - You are about to drop the column `DepartureAirportId` on the `Ferry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ferry" DROP CONSTRAINT "Ferry_DepartureAirportId_fkey";

-- AlterTable
ALTER TABLE "Ferry" DROP COLUMN "DepartureAirportId";
