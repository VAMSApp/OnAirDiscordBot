-- CreateTable
CREATE TABLE "Ferry" (
    "Id" TEXT NOT NULL,
    "AccountId" TEXT NOT NULL,
    "AircraftId" TEXT NOT NULL,
    "DepartureAirportId" TEXT NOT NULL,
    "ArrivalAirportId" TEXT NOT NULL,
    "IsCompleted" BOOLEAN NOT NULL DEFAULT false,
    "CompletedBy" TEXT,
    "CompletedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ferry_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Ferry" ADD CONSTRAINT "Ferry_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ferry" ADD CONSTRAINT "Ferry_CompletedBy_fkey" FOREIGN KEY ("CompletedBy") REFERENCES "Account"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ferry" ADD CONSTRAINT "Ferry_AircraftId_fkey" FOREIGN KEY ("AircraftId") REFERENCES "Aircraft"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ferry" ADD CONSTRAINT "Ferry_DepartureAirportId_fkey" FOREIGN KEY ("DepartureAirportId") REFERENCES "Airport"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ferry" ADD CONSTRAINT "Ferry_ArrivalAirportId_fkey" FOREIGN KEY ("ArrivalAirportId") REFERENCES "Airport"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
