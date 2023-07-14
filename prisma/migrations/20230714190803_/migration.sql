/*
  Warnings:

  - Added the required column `WorldId` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VirtualAirline" ADD COLUMN     "WorldId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VirtualAirline" ADD CONSTRAINT "VirtualAirline_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "World"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
