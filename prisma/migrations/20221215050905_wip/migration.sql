-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_AircraftId_fkey" FOREIGN KEY ("AircraftId") REFERENCES "Aircraft"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_FlightId_fkey" FOREIGN KEY ("FlightId") REFERENCES "Flight"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
