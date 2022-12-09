/*
  Warnings:

  - You are about to drop the column `Iata` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `Icao` on the `Airport` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ICAO]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ICAO` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Airport_Icao_key";

-- AlterTable
ALTER TABLE "Airport" DROP COLUMN "Iata",
DROP COLUMN "Icao",
ADD COLUMN     "IATA" TEXT,
ADD COLUMN     "ICAO" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Airport_ICAO_key" ON "Airport"("ICAO");
