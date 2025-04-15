/*
  Warnings:

  - Added the required column `password` to the `academics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "academics" ADD COLUMN     "password" TEXT NOT NULL;
