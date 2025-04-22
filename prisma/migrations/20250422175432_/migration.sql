/*
  Warnings:

  - You are about to drop the column `group_id` on the `sub_event` table. All the data in the column will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[created_by]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjective_id]` on the table `sub_event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[created_by]` on the table `sub_event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjective_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `sub_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjective_id` to the `sub_event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sub_event" DROP CONSTRAINT "sub_event_group_id_fkey";

-- DropIndex
DROP INDEX "sub_event_group_id_key";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "period" TEXT NOT NULL,
ADD COLUMN     "subjective_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sub_event" DROP COLUMN "group_id",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subjective_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "groups";

-- CreateTable
CREATE TABLE "students_subjectives" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "students_subjectives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_created_by_key" ON "events"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "sub_event_subjective_id_key" ON "sub_event"("subjective_id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_event_created_by_key" ON "sub_event"("created_by");

-- AddForeignKey
ALTER TABLE "sub_event" ADD CONSTRAINT "sub_event_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_event" ADD CONSTRAINT "sub_event_subjective_id_fkey" FOREIGN KEY ("subjective_id") REFERENCES "students_subjectives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
