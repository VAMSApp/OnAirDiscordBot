/*
  Warnings:

  - You are about to drop the column `PersonId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `AccountId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `PersonId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[EmployeeId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_PersonId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_PersonId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_CompanyId_fkey";

-- DropIndex
DROP INDEX "Account_PersonId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "PersonId",
ADD COLUMN     "EmployeeId" TEXT;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "AccountId",
DROP COLUMN "PersonId",
ADD COLUMN     "EmployeeId" TEXT;

-- DropTable
DROP TABLE "Person";

-- CreateTable
CREATE TABLE "Employee" (
    "Id" TEXT NOT NULL,
    "Pseudo" TEXT NOT NULL,
    "CompanyId" TEXT NOT NULL,
    "FlightHoursTotalBeforeHiring" DOUBLE PRECISION,
    "FlightHoursInCompany" DOUBLE PRECISION,
    "Category" INTEGER NOT NULL,
    "Status" INTEGER NOT NULL,
    "LastStatusChange" TIMESTAMP(3) NOT NULL,
    "IsOnline" BOOLEAN NOT NULL DEFAULT false,
    "FlightHoursGrandTotal" DOUBLE PRECISION,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_EmployeeId_key" ON "Account"("EmployeeId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_CurrentCompanyId_fkey" FOREIGN KEY ("CurrentCompanyId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
