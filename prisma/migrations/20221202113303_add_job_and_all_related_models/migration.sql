-- CreateTable
CREATE TABLE "CharterType" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "charterTypeCategory" INTEGER NOT NULL,
    "minPAX" INTEGER NOT NULL,
    "maxPAX" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharterType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charter" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "missionGuid" TEXT NOT NULL,
    "charterTypeGuid" TEXT NOT NULL,
    "charterTypeId" INTEGER NOT NULL,
    "currentAirportGuid" TEXT,
    "currentAirportId" INTEGER,
    "passengersNumber" INTEGER NOT NULL,
    "departureAirportGuid" TEXT,
    "departureAirportId" INTEGER,
    "destinationAirportGuid" TEXT,
    "destinationAirportId" INTEGER,
    "assignedToVAMemberGuid" TEXT,
    "assignedToVAMemberId" INTEGER,
    "distance" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "humanOnly" BOOLEAN NOT NULL,
    "companyGuid" TEXT NOT NULL,
    "inRecyclingPool" BOOLEAN NOT NULL,
    "minPAXSeatConf" INTEGER NOT NULL,
    "boardedPAXSeat" INTEGER NOT NULL,
    "minAircraftTypeLuxe" DOUBLE PRECISION NOT NULL,
    "rescueValidated" BOOLEAN NOT NULL,
    "rescueLate" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Charter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoType" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cargoTypeCategory" INTEGER NOT NULL,
    "minLbs" INTEGER NOT NULL,
    "maxLbs" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CargoType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "missionGuid" TEXT NOT NULL,
    "cargoTypeGuid" TEXT NOT NULL,
    "cargoTypeId" INTEGER NOT NULL,
    "currentAirportGuid" TEXT,
    "currentAirportId" INTEGER,
    "passengersNumber" INTEGER NOT NULL,
    "departureAirportGuid" TEXT,
    "departureAirportId" INTEGER,
    "destinationAirportGuid" TEXT,
    "destinationAirportId" INTEGER,
    "assignedToVAMemberGuid" TEXT,
    "assignedToVAMemberId" INTEGER,
    "distance" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "humanOnly" BOOLEAN NOT NULL,
    "companyGuid" TEXT NOT NULL,
    "inRecyclingPool" BOOLEAN NOT NULL,
    "RaceValidated" BOOLEAN NOT NULL,
    "IsInHangar" BOOLEAN NOT NULL,
    "rescueValidated" BOOLEAN NOT NULL,
    "rescueLate" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobType" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "baseReputationImpact" DOUBLE PRECISION NOT NULL,
    "basePayFactor" DOUBLE PRECISION NOT NULL,
    "basePenalityFactor" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "jobTypeGuid" TEXT NOT NULL,
    "jobTypeId" INTEGER NOT NULL,
    "mainAirportGuid" TEXT NOT NULL,
    "mainAirportId" INTEGER NOT NULL,
    "baseAirportGuid" TEXT NOT NULL,
    "baseAirportId" INTEGER NOT NULL,
    "valuePerLbsPerDistance" DOUBLE PRECISION NOT NULL,
    "isGoodValue" BOOLEAN NOT NULL,
    "maxDistance" DOUBLE PRECISION NOT NULL,
    "totalDistance" DOUBLE PRECISION NOT NULL,
    "mainAirportHeading" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "pay" DOUBLE PRECISION NOT NULL,
    "payLastMinuteBonus" DOUBLE PRECISION NOT NULL,
    "penality" DOUBLE PRECISION NOT NULL,
    "reputationImpact" DOUBLE PRECISION NOT NULL,
    "companyId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "takenDate" TIMESTAMP(3) NOT NULL,
    "totalCargoTransported" DOUBLE PRECISION NOT NULL,
    "totalPaxTransported" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "xP" INTEGER NOT NULL,
    "skillPoint" INTEGER NOT NULL,
    "minCompanyReput" DOUBLE PRECISION NOT NULL,
    "realPay" DOUBLE PRECISION NOT NULL,
    "realPenality" DOUBLE PRECISION NOT NULL,
    "canAccess" BOOLEAN NOT NULL,
    "isLastMinute" BOOLEAN NOT NULL,
    "isFavorited" BOOLEAN NOT NULL,
    "queriedFromFboGuid" TEXT,
    "queriedFromFboId" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharterToJob" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CargoToJob" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CharterType_guid_key" ON "CharterType"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Charter_guid_key" ON "Charter"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "CargoType_guid_key" ON "CargoType"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_guid_key" ON "Cargo"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "JobType_guid_key" ON "JobType"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Job_guid_key" ON "Job"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_guid_key" ON "Flight"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "_CharterToJob_AB_unique" ON "_CharterToJob"("A", "B");

-- CreateIndex
CREATE INDEX "_CharterToJob_B_index" ON "_CharterToJob"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CargoToJob_AB_unique" ON "_CargoToJob"("A", "B");

-- CreateIndex
CREATE INDEX "_CargoToJob_B_index" ON "_CargoToJob"("B");

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_charterTypeId_fkey" FOREIGN KEY ("charterTypeId") REFERENCES "CharterType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_currentAirportId_fkey" FOREIGN KEY ("currentAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_assignedToVAMemberId_fkey" FOREIGN KEY ("assignedToVAMemberId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_cargoTypeId_fkey" FOREIGN KEY ("cargoTypeId") REFERENCES "CargoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_currentAirportId_fkey" FOREIGN KEY ("currentAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_assignedToVAMemberId_fkey" FOREIGN KEY ("assignedToVAMemberId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobTypeId_fkey" FOREIGN KEY ("jobTypeId") REFERENCES "JobType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_mainAirportId_fkey" FOREIGN KEY ("mainAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_baseAirportId_fkey" FOREIGN KEY ("baseAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharterToJob" ADD CONSTRAINT "_CharterToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "Charter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharterToJob" ADD CONSTRAINT "_CharterToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargoToJob" ADD CONSTRAINT "_CargoToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "Cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargoToJob" ADD CONSTRAINT "_CargoToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
