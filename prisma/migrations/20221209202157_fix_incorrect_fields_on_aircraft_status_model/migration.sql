/*
  Warnings:

  - You are about to drop the column `Status` on the `AircraftStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ShortName]` on the table `AircraftStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Name` to the `AircraftStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShortName` to the `AircraftStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AircraftStatus" DROP COLUMN "Status",
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "ShortName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AircraftStatus_ShortName_key" ON "AircraftStatus"("ShortName");
