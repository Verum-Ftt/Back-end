/*
  Warnings:

  - Added the required column `title` to the `students_subjectives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students_subjectives" ADD COLUMN     "title" TEXT NOT NULL;
