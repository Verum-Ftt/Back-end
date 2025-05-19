/*
  Warnings:

  - Added the required column `created_by` to the `students_subjectives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students_subjectives" ADD COLUMN     "created_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "students_subjectives" ADD CONSTRAINT "students_subjectives_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
