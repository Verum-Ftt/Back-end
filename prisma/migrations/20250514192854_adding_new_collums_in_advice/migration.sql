/*
  Warnings:

  - Added the required column `created_by` to the `advice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `sub_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `sub_event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "advice_laboratory_id_key";

-- DropIndex
DROP INDEX "advice_sub_event_id_key";

-- AlterTable
ALTER TABLE "advice" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "laboratory" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "sub_event" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "advice" ADD CONSTRAINT "advice_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
