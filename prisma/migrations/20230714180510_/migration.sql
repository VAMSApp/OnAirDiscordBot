-- CreateTable
CREATE TABLE "Account" (
    "Id" TEXT NOT NULL,
    "DiscordId" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Discriminator" TEXT NOT NULL,
    "Locale" TEXT NOT NULL DEFAULT 'en-US',
    "Email" TEXT,
    "Verified" BOOLEAN DEFAULT false,
    "IsOnAirLinked" BOOLEAN DEFAULT false,
    "IsAdmin" BOOLEAN NOT NULL DEFAULT false,
    "IsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "LastLogin" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),
    "ApprovalToken" TEXT,
    "ApprovedById" TEXT,
    "EmployeeId" TEXT,
    "CompanyId" TEXT,
    "ApprovedAt" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "VirtualAirline" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "AirlineCode" TEXT NOT NULL,
    "ApiKey" TEXT,
    "InitalOwnerEquity" INTEGER,
    "PercentDividendsToDistribute" DOUBLE PRECISION,
    "LastDividendsDistribution" TIMESTAMP(3),
    "ImageName" TEXT,
    "ForceAssignJobsToPilots" BOOLEAN,
    "AutomaticallyAssignJobWhenTaken" BOOLEAN,
    "AutomaticallyAssignJobWhenLoaded" BOOLEAN,
    "RestrictEmployeesUsage" BOOLEAN,
    "RestrictLoadingVAJobsIntoNonVAAircraft" BOOLEAN,
    "RestrictLoadingNonVAJobsIntoVAAircraft" BOOLEAN,
    "MemberCount" INTEGER,
    "LastConnection" TIMESTAMP(3),
    "LastReportDate" TIMESTAMP(3),
    "Reputation" DOUBLE PRECISION,
    "CreationDate" TIMESTAMP(3) NOT NULL,
    "DifficultyLevel" INTEGER,
    "UTCOffsetinHours" DOUBLE PRECISION,
    "Paused" BOOLEAN,
    "Level" INTEGER,
    "LevelXP" INTEGER,
    "TransportEmployeeInstant" BOOLEAN,
    "TransportPlayerInstant" BOOLEAN,
    "ForceTimeInSimulator" BOOLEAN,
    "UseSmallAirports" BOOLEAN,
    "UseOnlyVanillaAirports" BOOLEAN,
    "EnableSkillTree" BOOLEAN,
    "CheckrideLevel" INTEGER,
    "EnableLandingPenalities" BOOLEAN,
    "EnableEmployeesFlightDutyAndSleep" BOOLEAN,
    "AircraftRentLevel" INTEGER,
    "EnableCargosAndChartersLoadingTime" BOOLEAN,
    "InSurvival" BOOLEAN,
    "PayBonusFactor" DOUBLE PRECISION,
    "EnableSimFailures" BOOLEAN,
    "DisableSeatsConfigCheck" BOOLEAN,
    "RealisticSimProcedures" BOOLEAN,
    "TravelTokens" INTEGER,
    "OnAirSyncedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),

    CONSTRAINT "VirtualAirline_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Company" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "AirlineCode" TEXT NOT NULL,
    "ApiKey" TEXT,
    "VirtualAirlineId" TEXT NOT NULL,
    "OwnerId" TEXT,
    "LastConnection" TIMESTAMP(3),
    "LastReportDate" TIMESTAMP(3),
    "Reputation" DOUBLE PRECISION,
    "CreationDate" TIMESTAMP(3),
    "DifficultyLevel" INTEGER DEFAULT 1,
    "UTCOffsetinHours" INTEGER DEFAULT 0,
    "Paused" BOOLEAN DEFAULT false,
    "PausedDate" TIMESTAMP(3),
    "Level" INTEGER DEFAULT 1,
    "LevelXP" INTEGER DEFAULT 1000,
    "TransportEmployeeInstant" BOOLEAN DEFAULT false,
    "TransportPlayerInstant" BOOLEAN DEFAULT false,
    "ForceTimeInSimulator" BOOLEAN DEFAULT false,
    "UseSmallAirports" BOOLEAN DEFAULT false,
    "UseOnlyVanillaAirports" BOOLEAN DEFAULT false,
    "EnableSkillTree" BOOLEAN DEFAULT false,
    "CheckrideLevel" INTEGER DEFAULT 0,
    "EnableLandingPenalities" BOOLEAN DEFAULT false,
    "EnableEmployeesFlightDutyAndSleep" BOOLEAN DEFAULT false,
    "AircraftRentLevel" INTEGER DEFAULT 0,
    "EnableCargosAndChartersLoadingTime" BOOLEAN DEFAULT false,
    "InSurvival" BOOLEAN DEFAULT false,
    "PayBonusFactor" INTEGER DEFAULT 0,
    "EnableSimFailures" BOOLEAN DEFAULT false,
    "DisableSeatsConfigCheck" BOOLEAN DEFAULT false,
    "RealisticSimProcedures" BOOLEAN DEFAULT false,
    "TravelTokens" INTEGER DEFAULT 0,
    "CurrentBadgeId" TEXT,
    "CurrentBadgeUrl" TEXT,
    "CurrentBadgeName" TEXT,
    "WorldId" TEXT,
    "LastWeeklyManagementsPaymentDate" TIMESTAMP(3),
    "OnAirSyncedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "World" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),

    CONSTRAINT "World_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "Id" TEXT NOT NULL,
    "Pseudo" TEXT NOT NULL,
    "CompanyId" TEXT NOT NULL,
    "CurrentAirportId" TEXT,
    "HomeAirportId" TEXT,
    "FlightHoursTotalBeforeHiring" DOUBLE PRECISION,
    "FlightHoursInCompany" DOUBLE PRECISION,
    "Category" INTEGER NOT NULL,
    "Status" INTEGER NOT NULL,
    "LastStatusChange" TIMESTAMP(3),
    "BirthDate" TIMESTAMP(3),
    "IsOnline" BOOLEAN NOT NULL DEFAULT false,
    "FlightHoursGrandTotal" DOUBLE PRECISION,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Airport" (
    "Id" TEXT NOT NULL,
    "ICAO" TEXT NOT NULL,
    "IATA" TEXT,
    "DisplayName" TEXT NOT NULL,
    "HasNoRunways" BOOLEAN DEFAULT false,
    "TimeOffsetInSec" INTEGER DEFAULT 0,
    "LocalTimeOpenInHoursSinceMidnight" DOUBLE PRECISION,
    "LocalTimeCloseInHoursSinceMidnight" DOUBLE PRECISION,
    "Name" TEXT NOT NULL,
    "State" TEXT,
    "CountryCode" TEXT,
    "CountryName" TEXT,
    "City" TEXT,
    "Latitude" DOUBLE PRECISION,
    "Longitude" DOUBLE PRECISION,
    "Elevation" DOUBLE PRECISION,
    "HasLandRunway" BOOLEAN DEFAULT false,
    "HasWaterRunway" BOOLEAN DEFAULT false,
    "HasHelipad" BOOLEAN DEFAULT false,
    "Size" INTEGER NOT NULL DEFAULT 0,
    "TransitionAltitude" INTEGER,
    "LastMETARDate" TIMESTAMP(3),
    "IsNotInVanillaFSX" BOOLEAN DEFAULT false,
    "IsNotInVanillaP3D" BOOLEAN DEFAULT false,
    "IsNotInVanillaXPLANE" BOOLEAN DEFAULT false,
    "IsNotInVanillaFS2020" BOOLEAN DEFAULT false,
    "IsClosed" BOOLEAN DEFAULT false,
    "IsValid" BOOLEAN DEFAULT false,
    "MagVar" DOUBLE PRECISION,
    "IsAddon" BOOLEAN DEFAULT false,
    "RandomSeed" INTEGER,
    "LastRandomSeedGeneration" TIMESTAMP(3),
    "IsMilitary" BOOLEAN DEFAULT false,
    "HasLights" BOOLEAN DEFAULT false,
    "AirportSource" INTEGER NOT NULL,
    "LastVeryShortRequestDate" TIMESTAMP(3),
    "LastSmallTripRequestDate" TIMESTAMP(3),
    "LastMediumTripRequestDate" TIMESTAMP(3),
    "LastShortHaulRequestDate" TIMESTAMP(3),
    "LastMediumHaulRequestDate" TIMESTAMP(3),
    "LastLongHaulRequestDate" TIMESTAMP(3),
    "UTCTimeOpenInHoursSinceMidnight" DOUBLE PRECISION,
    "UTCTimeCloseInHoursSinceMidnight" DOUBLE PRECISION,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("Id")
);

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
    "LastWeeklyPay" TIMESTAMP(3),
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "OnAirRefreshRequest" (
    "Id" TEXT NOT NULL,
    "Model" TEXT NOT NULL,
    "RequestDate" TIMESTAMP(3) NOT NULL,
    "ResponseDate" TIMESTAMP(3),
    "ResponseData" TEXT,
    "MemberId" TEXT,
    "EmployeeId" TEXT,
    "AirportId" TEXT,
    "CompanyId" TEXT,
    "VirtualAirlineId" TEXT,

    CONSTRAINT "OnAirRefreshRequest_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_DiscordId_key" ON "Account"("DiscordId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_Email_key" ON "Account"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_EmployeeId_key" ON "Account"("EmployeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_CompanyId_key" ON "Account"("CompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_AirlineCode_key" ON "VirtualAirline"("AirlineCode");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_ApiKey_key" ON "VirtualAirline"("ApiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Company_AirlineCode_key" ON "Company"("AirlineCode");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ApiKey_key" ON "Company"("ApiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Company_OwnerId_key" ON "Company"("OwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "World_ShortName_key" ON "World"("ShortName");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_ICAO_key" ON "Airport"("ICAO");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_ApprovedById_fkey" FOREIGN KEY ("ApprovedById") REFERENCES "Account"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "Account"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_VirtualAirlineId_fkey" FOREIGN KEY ("VirtualAirlineId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "World"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_CurrentAirportId_fkey" FOREIGN KEY ("CurrentAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_HomeAirportId_fkey" FOREIGN KEY ("HomeAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VARole" ADD CONSTRAINT "VARole_VAId_fkey" FOREIGN KEY ("VAId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_VARoleId_fkey" FOREIGN KEY ("VARoleId") REFERENCES "VARole"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_VaId_fkey" FOREIGN KEY ("VaId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnAirRefreshRequest" ADD CONSTRAINT "OnAirRefreshRequest_MemberId_fkey" FOREIGN KEY ("MemberId") REFERENCES "Member"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnAirRefreshRequest" ADD CONSTRAINT "OnAirRefreshRequest_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnAirRefreshRequest" ADD CONSTRAINT "OnAirRefreshRequest_AirportId_fkey" FOREIGN KEY ("AirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnAirRefreshRequest" ADD CONSTRAINT "OnAirRefreshRequest_VirtualAirlineId_fkey" FOREIGN KEY ("VirtualAirlineId") REFERENCES "VirtualAirline"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnAirRefreshRequest" ADD CONSTRAINT "OnAirRefreshRequest_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
