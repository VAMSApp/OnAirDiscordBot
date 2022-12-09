/*
  Warnings:

  - You are about to drop the column `LinkedToOnAir` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "LinkedToOnAir",
ADD COLUMN     "IsOnAirLinked" BOOLEAN DEFAULT false,
ALTER COLUMN "Locale" SET DEFAULT 'en-US',
ALTER COLUMN "Verified" DROP NOT NULL,
ALTER COLUMN "Verified" SET DEFAULT false;
