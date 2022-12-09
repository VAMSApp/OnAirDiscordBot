-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "WorldId" TEXT;

-- CreateTable
CREATE TABLE "World" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),

    CONSTRAINT "World_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "World_ShortName_key" ON "World"("ShortName");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "World"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "World"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
