/*
  Warnings:

  - You are about to alter the column `rentFuelTotalGallons` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `heading` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `longitude` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `latitude` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fuelTotalGallons` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `airframeHours` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `airframeCondition` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `airframeMaxCondition` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `hoursBefore100HInspection` on the `Aircraft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `Condition` on the `AircraftEngine` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `MaxCondition` on the `AircraftEngine` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `EngineHours` on the `AircraftEngine` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `maximumRangeInHour` on the `AircraftType` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `designSpeedVS0` on the `AircraftType` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `designSpeedVS1` on the `AircraftType` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `localTimeOpenInHoursSinceMidnight` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `localTimeCloseInHoursSinceMidnight` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `latitude` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `longitude` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `elevation` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `uTCTimeOpenInHoursSinceMidnight` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `uTCTimeCloseInHoursSinceMidnight` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `reputation` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `flightHoursTotalBeforeHiring` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `flightHoursInCompany` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `flightHoursGrandTotal` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `payBonusFactor` on the `VirtualAirline` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `percentDividendsToDistribute` on the `VirtualAirline` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `reputation` on the `VirtualAirline` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `uTCOffsetinHours` on the `VirtualAirline` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Aircraft" ALTER COLUMN "rentFuelTotalGallons" SET DATA TYPE INTEGER,
ALTER COLUMN "heading" SET DATA TYPE INTEGER,
ALTER COLUMN "longitude" SET DATA TYPE INTEGER,
ALTER COLUMN "latitude" SET DATA TYPE INTEGER,
ALTER COLUMN "fuelTotalGallons" SET DATA TYPE INTEGER,
ALTER COLUMN "airframeHours" SET DATA TYPE INTEGER,
ALTER COLUMN "airframeCondition" SET DATA TYPE INTEGER,
ALTER COLUMN "airframeMaxCondition" SET DATA TYPE INTEGER,
ALTER COLUMN "hoursBefore100HInspection" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "AircraftEngine" ALTER COLUMN "Condition" SET DATA TYPE INTEGER,
ALTER COLUMN "MaxCondition" SET DATA TYPE INTEGER,
ALTER COLUMN "EngineHours" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "AircraftType" ALTER COLUMN "maximumRangeInHour" SET DATA TYPE INTEGER,
ALTER COLUMN "designSpeedVS0" SET DATA TYPE INTEGER,
ALTER COLUMN "designSpeedVS1" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Airport" ALTER COLUMN "localTimeOpenInHoursSinceMidnight" SET DATA TYPE INTEGER,
ALTER COLUMN "localTimeCloseInHoursSinceMidnight" SET DATA TYPE INTEGER,
ALTER COLUMN "latitude" SET DATA TYPE INTEGER,
ALTER COLUMN "longitude" SET DATA TYPE INTEGER,
ALTER COLUMN "elevation" SET DATA TYPE INTEGER,
ALTER COLUMN "uTCTimeOpenInHoursSinceMidnight" SET DATA TYPE INTEGER,
ALTER COLUMN "uTCTimeCloseInHoursSinceMidnight" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "reputation" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "flightHoursTotalBeforeHiring" SET DATA TYPE INTEGER,
ALTER COLUMN "flightHoursInCompany" SET DATA TYPE INTEGER,
ALTER COLUMN "flightHoursGrandTotal" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "VirtualAirline" ALTER COLUMN "payBonusFactor" SET DATA TYPE INTEGER,
ALTER COLUMN "percentDividendsToDistribute" SET DATA TYPE INTEGER,
ALTER COLUMN "reputation" SET DATA TYPE INTEGER,
ALTER COLUMN "uTCOffsetinHours" SET DATA TYPE INTEGER;
