-- CreateTable
CREATE TABLE "VARole" (
    "Id" TEXT NOT NULL,
    "VAId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Permission" INTEGER NOT NULL,
    "IsDefaultNewRole" BOOLEAN NOT NULL,
    "Color" TEXT NOT NULL,
    "PayPercent" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "IsHidden" BOOLEAN NOT NULL,
    "RestrictLoadingVAJobsIntoNonVAAircraft" BOOLEAN NOT NULL,
    "RestrictLoadingNonVAJobsIntoVAAircraft" BOOLEAN NOT NULL,
    "PayWeekly" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "PayPerFlightHour" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VARole_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Member" (
    "Id" TEXT NOT NULL,
    "VaId" TEXT NOT NULL,
    "CompanyId" TEXT NOT NULL,
    "VARoleId" TEXT NOT NULL,
    "TotalCargosTransportedLbs" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "TotalPAXsTransported" INTEGER NOT NULL DEFAULT 0,
    "TotalEarnedCredits" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "TotalSpentCredits" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "NumberOfFlights" INTEGER NOT NULL DEFAULT 0,
    "FlightHours" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "Color" TEXT NOT NULL,
    "AcceptMigration" BOOLEAN NOT NULL DEFAULT false,
    "ReputationImpact" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "LastWeeklyPay" TIMESTAMP(3) NOT NULL,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_VARoleId_fkey" FOREIGN KEY ("VARoleId") REFERENCES "VARole"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_VaId_fkey" FOREIGN KEY ("VaId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
