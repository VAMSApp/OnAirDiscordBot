/*
  Warnings:

  - You are about to drop the column `AircraftStatus` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `EngineType` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `FuelType` on the `AircraftType` table. All the data in the column will be lost.
  - Added the required column `AircraftStatusId` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EngineTypeId` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FuelTypeId` to the `AircraftType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "AircraftStatus",
ADD COLUMN     "AircraftStatusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AircraftType" DROP COLUMN "EngineType",
DROP COLUMN "FuelType",
ADD COLUMN     "EngineTypeId" INTEGER NOT NULL,
ADD COLUMN     "FuelTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AircraftStatus" (
    "Id" INTEGER NOT NULL,
    "Status" INTEGER NOT NULL,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AircraftStatus_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "FuelType" (
    "Id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FuelType_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "EngineType" (
    "Id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EngineType_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FuelType_ShortName_key" ON "FuelType"("ShortName");

-- CreateIndex
CREATE UNIQUE INDEX "EngineType_ShortName_key" ON "EngineType"("ShortName");

-- AddForeignKey
ALTER TABLE "AircraftType" ADD CONSTRAINT "AircraftType_FuelTypeId_fkey" FOREIGN KEY ("FuelTypeId") REFERENCES "FuelType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftType" ADD CONSTRAINT "AircraftType_EngineTypeId_fkey" FOREIGN KEY ("EngineTypeId") REFERENCES "EngineType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_AircraftStatusId_fkey" FOREIGN KEY ("AircraftStatusId") REFERENCES "AircraftStatus"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
