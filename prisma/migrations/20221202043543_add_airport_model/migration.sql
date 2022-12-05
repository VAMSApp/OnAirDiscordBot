-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "icao" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "hasNoRunways" BOOLEAN DEFAULT false,
    "timeOffsetInSec" INTEGER DEFAULT 0,
    "localTimeOpenInHoursSinceMidnight" DOUBLE PRECISION,
    "localTimeCloseInHoursSinceMidnight" DOUBLE PRECISION,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "elevation" DOUBLE PRECISION,
    "hasLandRunway" BOOLEAN DEFAULT false,
    "hasWaterRunway" BOOLEAN DEFAULT false,
    "hasHelipad" BOOLEAN DEFAULT false,
    "size" INTEGER NOT NULL DEFAULT 0,
    "transitionAltitude" INTEGER,
    "lastMETARDate" TIMESTAMP(3),
    "isNotInVanillaFSX" BOOLEAN DEFAULT false,
    "isNotInVanillaP3D" BOOLEAN DEFAULT false,
    "isNotInVanillaXPLANE" BOOLEAN DEFAULT false,
    "isNotInVanillaFS2020" BOOLEAN DEFAULT false,
    "isClosed" BOOLEAN DEFAULT false,
    "isValid" BOOLEAN DEFAULT false,
    "magVar" INTEGER,
    "isAddon" BOOLEAN DEFAULT false,
    "randomSeed" INTEGER,
    "lastRandomSeedGeneration" TIMESTAMP(3),
    "isMilitary" BOOLEAN DEFAULT false,
    "hasLights" BOOLEAN DEFAULT false,
    "airportSource" INTEGER NOT NULL,
    "lastVeryShortRequestDate" TIMESTAMP(3),
    "lastSmallTripRequestDate" TIMESTAMP(3),
    "lastMediumTripRequestDate" TIMESTAMP(3),
    "lastShortHaulRequestDate" TIMESTAMP(3),
    "lastMediumHaulRequestDate" TIMESTAMP(3),
    "lastLongHaulRequestDate" TIMESTAMP(3),
    "uTCTimeOpenInHoursSinceMidnight" DOUBLE PRECISION,
    "uTCTimeCloseInHoursSinceMidnight" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_guid_key" ON "Airport"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_icao_key" ON "Airport"("icao");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");
