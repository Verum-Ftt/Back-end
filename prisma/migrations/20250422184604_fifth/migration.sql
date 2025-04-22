-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
