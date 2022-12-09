/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "Email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_Email_key" ON "Account"("Email");
