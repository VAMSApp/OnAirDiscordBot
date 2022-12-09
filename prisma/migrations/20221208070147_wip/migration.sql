/*
  Warnings:

  - You are about to drop the column `OnairSyncedAt` on the `Aircraft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "OnairSyncedAt",
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3);
