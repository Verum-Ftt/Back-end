/*
  Warnings:

  - You are about to drop the column `subjective_id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `advice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laboratory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `qrCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `register` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students_subjectives` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_event` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "advice" DROP CONSTRAINT "advice_created_by_fkey";

-- DropForeignKey
ALTER TABLE "advice" DROP CONSTRAINT "advice_laboratory_id_fkey";

-- DropForeignKey
ALTER TABLE "advice" DROP CONSTRAINT "advice_sub_event_id_fkey";

-- DropForeignKey
ALTER TABLE "qrCode" DROP CONSTRAINT "qrCode_laboratory_id_fkey";

-- DropForeignKey
ALTER TABLE "qrCode" DROP CONSTRAINT "qrCode_student_id_fkey";

-- DropForeignKey
ALTER TABLE "qrCode" DROP CONSTRAINT "qrCode_sub_event_id_fkey";

-- DropForeignKey
ALTER TABLE "register" DROP CONSTRAINT "register_academic_id_fkey";

-- DropForeignKey
ALTER TABLE "register" DROP CONSTRAINT "register_qr_code_id_fkey";

-- DropForeignKey
ALTER TABLE "students_subjectives" DROP CONSTRAINT "students_subjectives_created_by_fkey";

-- DropForeignKey
ALTER TABLE "sub_event" DROP CONSTRAINT "sub_event_created_by_fkey";

-- DropForeignKey
ALTER TABLE "sub_event" DROP CONSTRAINT "sub_event_event_id_fkey";

-- DropForeignKey
ALTER TABLE "sub_event" DROP CONSTRAINT "sub_event_subjective_id_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "subjective_id";

-- DropTable
DROP TABLE "advice";

-- DropTable
DROP TABLE "laboratory";

-- DropTable
DROP TABLE "qrCode";

-- DropTable
DROP TABLE "register";

-- DropTable
DROP TABLE "students_subjectives";

-- DropTable
DROP TABLE "sub_event";

-- DropEnum
DROP TYPE "tier";

-- CreateTable
CREATE TABLE "qrCodes" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "laboratory_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "randomization_version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "qrCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "qr_code_id" TEXT NOT NULL,
    "academic_id" TEXT NOT NULL,
    "sub_event_id" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_events" (
    "id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "subjective_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sub_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjectives" (
    "id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "subjectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_subjectives" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subjective_id" TEXT NOT NULL,

    CONSTRAINT "student_subjectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laboratories" (
    "id" TEXT NOT NULL,
    "local" TEXT,
    "total_capacity" INTEGER NOT NULL,
    "available_capacity" INTEGER NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laboratories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advices" (
    "id" TEXT NOT NULL,
    "laboratory_id" TEXT NOT NULL,
    "sub_event_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seats_affected" INTEGER NOT NULL,
    "tier" "Tier" NOT NULL DEFAULT 'LOW',
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "advices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qrCodes_student_id_event_id_key" ON "qrCodes"("student_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_subjectives_student_id_subjective_id_key" ON "student_subjectives"("student_id", "subjective_id");

-- AddForeignKey
ALTER TABLE "qrCodes" ADD CONSTRAINT "qrCodes_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qrCodes" ADD CONSTRAINT "qrCodes_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qrCodes" ADD CONSTRAINT "qrCodes_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_qr_code_id_fkey" FOREIGN KEY ("qr_code_id") REFERENCES "qrCodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_academic_id_fkey" FOREIGN KEY ("academic_id") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_sub_event_id_fkey" FOREIGN KEY ("sub_event_id") REFERENCES "sub_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_subjective_id_fkey" FOREIGN KEY ("subjective_id") REFERENCES "subjectives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectives" ADD CONSTRAINT "subjectives_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_subjectives" ADD CONSTRAINT "student_subjectives_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_subjectives" ADD CONSTRAINT "student_subjectives_subjective_id_fkey" FOREIGN KEY ("subjective_id") REFERENCES "subjectives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advices" ADD CONSTRAINT "advices_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advices" ADD CONSTRAINT "advices_sub_event_id_fkey" FOREIGN KEY ("sub_event_id") REFERENCES "sub_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advices" ADD CONSTRAINT "advices_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
