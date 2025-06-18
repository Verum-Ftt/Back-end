/*
  Warnings:

  - You are about to drop the column `active` on the `academics` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `qrCodes` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `sub_events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id,sub_event_id]` on the table `qrCodes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_event_id` to the `qrCodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_event_date` to the `sub_events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "qrCodes" DROP CONSTRAINT "qrCodes_event_id_fkey";

-- DropIndex
DROP INDEX "qrCodes_student_id_event_id_key";

-- AlterTable
ALTER TABLE "academics" DROP COLUMN "active",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "date",
ADD COLUMN     "event_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "qrCodes" DROP COLUMN "event_id",
ADD COLUMN     "sub_event_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "active",
DROP COLUMN "class",
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "sub_events" DROP COLUMN "date",
ADD COLUMN     "sub_event_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "subjectives" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "qrCodes_student_id_sub_event_id_key" ON "qrCodes"("student_id", "sub_event_id");

-- AddForeignKey
ALTER TABLE "qrCodes" ADD CONSTRAINT "qrCodes_sub_event_id_fkey" FOREIGN KEY ("sub_event_id") REFERENCES "sub_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
