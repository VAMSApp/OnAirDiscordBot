-- CreateTable
CREATE TABLE "AircraftEngine" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "AircraftGuid" TEXT NOT NULL,
    "Number" INTEGER NOT NULL,
    "Condition" DOUBLE PRECISION NOT NULL,
    "MaxCondition" DOUBLE PRECISION NOT NULL,
    "EngineHours" DOUBLE PRECISION NOT NULL,
    "LastCheckup" TIMESTAMP(3) NOT NULL,
    "aircraftId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AircraftEngine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftClass" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AircraftClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftType" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "aircraftClassGuid" TEXT NOT NULL,
    "aircraftClassId" INTEGER NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,
    "LastModerationDate" TIMESTAMP(3) NOT NULL,
    "DisplayName" TEXT NOT NULL,
    "TypeName" TEXT NOT NULL,
    "FlightsCount" INTEGER NOT NULL,
    "TimeBetweenOverhaul" INTEGER NOT NULL,
    "HightimeAirframe" INTEGER NOT NULL,
    "AirportMinSize" INTEGER NOT NULL,
    "emptyWeight" INTEGER NOT NULL,
    "maximumGrossWeight" INTEGER NOT NULL,
    "estimatedCruiseFF" INTEGER NOT NULL,
    "Baseprice" INTEGER NOT NULL,
    "FuelTotalCapacityInGallons" INTEGER NOT NULL,
    "engineType" INTEGER NOT NULL,
    "numberOfEngines" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "needsCopilot" BOOLEAN NOT NULL,
    "fuelType" INTEGER NOT NULL,
    "maximumCargoWeight" INTEGER NOT NULL,
    "maximumRangeInHour" DOUBLE PRECISION NOT NULL,
    "maximumRangeInNM" INTEGER NOT NULL,
    "designSpeedVS0" DOUBLE PRECISION NOT NULL,
    "designSpeedVS1" DOUBLE PRECISION NOT NULL,
    "designSpeedVC" INTEGER NOT NULL,
    "IsDisabled" BOOLEAN NOT NULL,
    "LuxeFactor" INTEGER NOT NULL,
    "GliderHasEngine" BOOLEAN NOT NULL,
    "StandardSeatWeight" INTEGER NOT NULL,
    "IsFighter" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AircraftType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "aircraftTypeGuid" TEXT NOT NULL,
    "aircraftTypeId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "worldGuid" TEXT NOT NULL,
    "aircraftStatus" INTEGER NOT NULL,
    "lastStatusChange" TIMESTAMP(3) NOT NULL,
    "currentStatusDurationInMinutes" INTEGER NOT NULL,
    "allowSell" BOOLEAN NOT NULL,
    "allowRent" BOOLEAN NOT NULL,
    "allowLease" BOOLEAN NOT NULL,
    "sellPrice" INTEGER,
    "rentHourPrice" INTEGER,
    "rentalAirportGuid" TEXT,
    "rentaAirportId" INTEGER,
    "rentFuelTotalGallons" DOUBLE PRECISION,
    "rentCautionAmount" INTEGER,
    "rentalCompanyId" INTEGER,
    "rentCompanyGuid" TEXT,
    "rentStartDate" TIMESTAMP(3),
    "rentLastDailyChargeDate" TIMESTAMP(3),
    "ownerCompanyGuid" TEXT,
    "ownerCompanyId" INTEGER,
    "currentAirportId" INTEGER,
    "currentAirportGuid" TEXT NOT NULL,
    "heading" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "fuelTotalGallons" DOUBLE PRECISION,
    "fuelWeight" INTEGER,
    "altitude" INTEGER,
    "flightState" INTEGER,
    "loadedWeight" INTEGER,
    "zeroFuelWeight" INTEGER,
    "airframeHours" DOUBLE PRECISION,
    "airframeCondition" DOUBLE PRECISION,
    "airframeMaxCondition" DOUBLE PRECISION,
    "lastAnnualCheckup" TIMESTAMP(3),
    "last100hInspection" TIMESTAMP(3),
    "lastWeeklyOwnershipPayment" TIMESTAMP(3),
    "lastParkingFeePayment" TIMESTAMP(3),
    "isControlledByAI" BOOLEAN DEFAULT false,
    "hoursBefore100HInspection" DOUBLE PRECISION,
    "configFirstSeats" INTEGER,
    "configBusSeats" INTEGER,
    "configEcoSeats" INTEGER,
    "seatsReservedForEmployees" INTEGER,
    "lastMagicTransportationDate" TIMESTAMP(3),
    "currentCompanyGuid" TEXT,
    "currentCompanyGuidIfAny" TEXT,
    "extraWeightCapacity" INTEGER,
    "totalWeightCapacity" INTEGER,
    "currentSeats" INTEGER,
    "mustDoMaintenance" BOOLEAN DEFAULT false,
    "onairSyncedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AircraftEngine_guid_key" ON "AircraftEngine"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "AircraftClass_guid_key" ON "AircraftClass"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "AircraftClass_shortName_key" ON "AircraftClass"("shortName");

-- CreateIndex
CREATE UNIQUE INDEX "AircraftType_guid_key" ON "AircraftType"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_guid_key" ON "Aircraft"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_identifier_key" ON "Aircraft"("identifier");

-- AddForeignKey
ALTER TABLE "AircraftEngine" ADD CONSTRAINT "AircraftEngine_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftType" ADD CONSTRAINT "AircraftType_aircraftClassId_fkey" FOREIGN KEY ("aircraftClassId") REFERENCES "AircraftClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "AircraftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_rentaAirportId_fkey" FOREIGN KEY ("rentaAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_currentAirportId_fkey" FOREIGN KEY ("currentAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_rentalCompanyId_fkey" FOREIGN KEY ("rentalCompanyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_ownerCompanyId_fkey" FOREIGN KEY ("ownerCompanyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
