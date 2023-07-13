-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "ActionId" SET DEFAULT 0,
ALTER COLUMN "CategoryId" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "NotificationCategory" (
    "Id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationCategory_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "NotificationAction" (
    "Id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "OnAirSyncedAt" TIMESTAMP(3),
    "UpdatedAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationAction_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationCategory_ShortName_key" ON "NotificationCategory"("ShortName");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationAction_ShortName_key" ON "NotificationAction"("ShortName");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "NotificationCategory"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_ActionId_fkey" FOREIGN KEY ("ActionId") REFERENCES "NotificationAction"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
