/*
  Warnings:

  - You are about to drop the `OnAirRefreshRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OnAirRefreshRequest" DROP CONSTRAINT "OnAirRefreshRequest_AirportId_fkey";

-- DropForeignKey
ALTER TABLE "OnAirRefreshRequest" DROP CONSTRAINT "OnAirRefreshRequest_CompanyId_fkey";

-- DropForeignKey
ALTER TABLE "OnAirRefreshRequest" DROP CONSTRAINT "OnAirRefreshRequest_EmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "OnAirRefreshRequest" DROP CONSTRAINT "OnAirRefreshRequest_MemberId_fkey";

-- DropForeignKey
ALTER TABLE "OnAirRefreshRequest" DROP CONSTRAINT "OnAirRefreshRequest_VirtualAirlineId_fkey";

-- DropTable
DROP TABLE "OnAirRefreshRequest";

-- CreateTable
CREATE TABLE "OnAirRequest" (
    "Id" TEXT NOT NULL,
    "Model" TEXT NOT NULL,
    "RequestDate" TIMESTAMP(3) NOT NULL,
    "ResponseDate" TIMESTAMP(3),
    "ResponseData" TEXT,
    "VirtualAirlineId" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),

    CONSTRAINT "OnAirRequest_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "OnAirRequest" ADD CONSTRAINT "OnAirRequest_VirtualAirlineId_fkey" FOREIGN KEY ("VirtualAirlineId") REFERENCES "VirtualAirline"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
