/*
  Warnings:

  - Added the required column `Category` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "ActualConsumptionAtCruiseLevelInGalPerHour" DOUBLE PRECISION,
ADD COLUMN     "ActualConsumptionAtCruiseLevelInLbsPerHour" DOUBLE PRECISION,
ADD COLUMN     "ActualCruiseAltitude" DOUBLE PRECISION,
ADD COLUMN     "ActualCruiseTimeInMinutes" DOUBLE PRECISION,
ADD COLUMN     "ActualPressureAltitude" DOUBLE PRECISION,
ADD COLUMN     "ActualTASAtCruiseLevel" DOUBLE PRECISION,
ADD COLUMN     "ActualTotalFuelConsumptionInLbs" DOUBLE PRECISION,
ADD COLUMN     "AddedFuelQty" INTEGER,
ADD COLUMN     "AirborneRealTime" TIMESTAMP(3),
ADD COLUMN     "AirborneTime" TIMESTAMP(3),
ADD COLUMN     "AircraftCurrentAltitude" DOUBLE PRECISION,
ADD COLUMN     "AircraftCurrentFOB" DOUBLE PRECISION,
ADD COLUMN     "AircraftId" TEXT,
ADD COLUMN     "ArrivalActualAirportId" TEXT,
ADD COLUMN     "ArrivalAlternateAirportId" TEXT,
ADD COLUMN     "ArrivalIntendedAirportId" TEXT,
ADD COLUMN     "CanResumeOrAbort" BOOLEAN,
ADD COLUMN     "Cargo" INTEGER,
ADD COLUMN     "CargosTotalWeight" DOUBLE PRECISION,
ADD COLUMN     "Category" INTEGER NOT NULL,
ADD COLUMN     "CompanyId" TEXT,
ADD COLUMN     "DepartureAirportId" TEXT,
ADD COLUMN     "EndTime" TIMESTAMP(3),
ADD COLUMN     "Engine1Status" INTEGER,
ADD COLUMN     "Engine2Status" INTEGER,
ADD COLUMN     "Engine3Status" INTEGER,
ADD COLUMN     "Engine4Status" INTEGER,
ADD COLUMN     "Engine5Status" INTEGER,
ADD COLUMN     "Engine6Status" INTEGER,
ADD COLUMN     "EngineOffRealTime" TIMESTAMP(3),
ADD COLUMN     "EngineOffTime" TIMESTAMP(3),
ADD COLUMN     "EngineOnRealTime" TIMESTAMP(3),
ADD COLUMN     "EngineOnTime" TIMESTAMP(3),
ADD COLUMN     "HasOverspeeded" BOOLEAN,
ADD COLUMN     "HasStalled" BOOLEAN,
ADD COLUMN     "IntendedFlightLevel" INTEGER,
ADD COLUMN     "IsAI" BOOLEAN,
ADD COLUMN     "LandedRealTime" TIMESTAMP(3),
ADD COLUMN     "LandedTime" TIMESTAMP(3),
ADD COLUMN     "MaxBank" DOUBLE PRECISION,
ADD COLUMN     "MaxGForce" DOUBLE PRECISION,
ADD COLUMN     "MaxPitch" DOUBLE PRECISION,
ADD COLUMN     "MinGForce" DOUBLE PRECISION,
ADD COLUMN     "PAXCount" INTEGER,
ADD COLUMN     "Passengers" INTEGER,
ADD COLUMN     "RegisterState" INTEGER,
ADD COLUMN     "Registered" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ResultComments" TEXT,
ADD COLUMN     "StartHeading" DOUBLE PRECISION,
ADD COLUMN     "StartLatitude" DOUBLE PRECISION,
ADD COLUMN     "StartLongitude" DOUBLE PRECISION,
ADD COLUMN     "StartTime" TIMESTAMP(3),
ADD COLUMN     "TimeOffset" DOUBLE PRECISION,
ADD COLUMN     "VerticalSpeedAtTouchdownMpS" DOUBLE PRECISION,
ADD COLUMN     "WrongFuelDetected" BOOLEAN,
ADD COLUMN     "WrongWeightDetected" BOOLEAN,
ADD COLUMN     "XPFlight" INTEGER,
ADD COLUMN     "XPFlightBonus" DOUBLE PRECISION,
ADD COLUMN     "XPMissions" INTEGER;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_AircraftId_fkey" FOREIGN KEY ("AircraftId") REFERENCES "Aircraft"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_DepartureAirportId_fkey" FOREIGN KEY ("DepartureAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_ArrivalIntendedAirportId_fkey" FOREIGN KEY ("ArrivalIntendedAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_ArrivalAlternateAirportId_fkey" FOREIGN KEY ("ArrivalAlternateAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_ArrivalActualAirportId_fkey" FOREIGN KEY ("ArrivalActualAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
