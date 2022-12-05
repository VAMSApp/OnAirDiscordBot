/*
  Warnings:

  - You are about to drop the column `CompanyGuid` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `QueriedFromFboGuid` on the `Job` table. All the data in the column will be lost.
  - Added the required column `CompanyId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "CompanyGuid",
DROP COLUMN "QueriedFromFboGuid",
ADD COLUMN     "CompanyId" TEXT NOT NULL,
ALTER COLUMN "QueriedFromFboId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
