/*
  Warnings:

  - You are about to drop the column `VaId` on the `Member` table. All the data in the column will be lost.
  - Added the required column `VAId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_VaId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "VaId",
ADD COLUMN     "VAId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_VAId_fkey" FOREIGN KEY ("VAId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
