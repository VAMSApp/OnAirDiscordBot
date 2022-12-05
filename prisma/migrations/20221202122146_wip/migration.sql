/*
  Warnings:

  - You are about to drop the column `missionGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `missionGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `_CargoToJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CharterToJob` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jobGuid` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobGuid` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyGuid` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CargoToJob" DROP CONSTRAINT "_CargoToJob_A_fkey";

-- DropForeignKey
ALTER TABLE "_CargoToJob" DROP CONSTRAINT "_CargoToJob_B_fkey";

-- DropForeignKey
ALTER TABLE "_CharterToJob" DROP CONSTRAINT "_CharterToJob_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharterToJob" DROP CONSTRAINT "_CharterToJob_B_fkey";

-- AlterTable
ALTER TABLE "Cargo" DROP COLUMN "missionGuid",
ADD COLUMN     "jobGuid" TEXT NOT NULL,
ADD COLUMN     "jobId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Charter" DROP COLUMN "missionGuid",
ADD COLUMN     "jobGuid" TEXT NOT NULL,
ADD COLUMN     "jobId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "companyId",
ADD COLUMN     "companyGuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CargoToJob";

-- DropTable
DROP TABLE "_CharterToJob";

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
