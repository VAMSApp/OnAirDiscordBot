-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "CurrentAirportId" TEXT,
ADD COLUMN     "HomeAirportId" TEXT;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_CurrentAirportId_fkey" FOREIGN KEY ("CurrentAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_HomeAirportId_fkey" FOREIGN KEY ("HomeAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
