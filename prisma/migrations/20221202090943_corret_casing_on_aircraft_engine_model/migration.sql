/*
  Warnings:

  - You are about to drop the column `AircraftGuid` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `Condition` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `EngineHours` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `LastCheckup` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `MaxCondition` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `Number` on the `AircraftEngine` table. All the data in the column will be lost.
  - Added the required column `aircraftGuid` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engineHours` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastCheckup` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxCondition` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AircraftEngine" DROP COLUMN "AircraftGuid",
DROP COLUMN "Condition",
DROP COLUMN "EngineHours",
DROP COLUMN "LastCheckup",
DROP COLUMN "MaxCondition",
DROP COLUMN "Number",
ADD COLUMN     "aircraftGuid" TEXT NOT NULL,
ADD COLUMN     "condition" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "engineHours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lastCheckup" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "maxCondition" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;
