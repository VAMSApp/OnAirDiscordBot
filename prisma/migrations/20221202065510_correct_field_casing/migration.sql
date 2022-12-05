/*
  Warnings:

  - You are about to drop the column `AirportMinSize` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `Baseprice` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `CreationDate` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `DisplayName` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `FlightsCount` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `FuelTotalCapacityInGallons` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `GliderHasEngine` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `HightimeAirframe` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `IsDisabled` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `IsFighter` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `LastModerationDate` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `LuxeFactor` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `StandardSeatWeight` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `TimeBetweenOverhaul` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `TypeName` on the `AircraftType` table. All the data in the column will be lost.
  - Added the required column `airportMinSize` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseprice` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationDate` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightsCount` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelTotalCapacityInGallons` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gliderHasEngine` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hightimeAirframe` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDisabled` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastModerationDate` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luxeFactor` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `standardSeatWeight` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeBetweenOverhaul` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeName` to the `AircraftType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AircraftType" DROP COLUMN "AirportMinSize",
DROP COLUMN "Baseprice",
DROP COLUMN "CreationDate",
DROP COLUMN "DisplayName",
DROP COLUMN "FlightsCount",
DROP COLUMN "FuelTotalCapacityInGallons",
DROP COLUMN "GliderHasEngine",
DROP COLUMN "HightimeAirframe",
DROP COLUMN "IsDisabled",
DROP COLUMN "IsFighter",
DROP COLUMN "LastModerationDate",
DROP COLUMN "LuxeFactor",
DROP COLUMN "StandardSeatWeight",
DROP COLUMN "TimeBetweenOverhaul",
DROP COLUMN "TypeName",
ADD COLUMN     "airportMinSize" INTEGER NOT NULL,
ADD COLUMN     "baseprice" INTEGER NOT NULL,
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "flightsCount" INTEGER NOT NULL,
ADD COLUMN     "fuelTotalCapacityInGallons" INTEGER NOT NULL,
ADD COLUMN     "gliderHasEngine" BOOLEAN NOT NULL,
ADD COLUMN     "hightimeAirframe" INTEGER NOT NULL,
ADD COLUMN     "isDisabled" BOOLEAN NOT NULL,
ADD COLUMN     "isFighter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastModerationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "luxeFactor" INTEGER NOT NULL,
ADD COLUMN     "standardSeatWeight" INTEGER NOT NULL,
ADD COLUMN     "timeBetweenOverhaul" INTEGER NOT NULL,
ADD COLUMN     "typeName" TEXT NOT NULL;
