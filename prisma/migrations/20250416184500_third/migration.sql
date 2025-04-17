/*
  Warnings:

  - The primary key for the `academics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `advice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `laboratory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `qrCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `register` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sub_event` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
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
ALTER TABLE "sub_event" DROP CONSTRAINT "sub_event_event_id_fkey";

-- DropForeignKey
ALTER TABLE "sub_event" DROP CONSTRAINT "sub_event_group_id_fkey";

-- AlterTable
ALTER TABLE "academics" DROP CONSTRAINT "academics_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "academics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "academics_id_seq";

-- AlterTable
ALTER TABLE "advice" DROP CONSTRAINT "advice_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "laboratory_id" SET DATA TYPE TEXT,
ALTER COLUMN "sub_event_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "advice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "advice_id_seq";

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "events_id_seq";

-- AlterTable
ALTER TABLE "groups" DROP CONSTRAINT "groups_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "groups_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "groups_id_seq";

-- AlterTable
ALTER TABLE "laboratory" DROP CONSTRAINT "laboratory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "laboratory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "laboratory_id_seq";

-- AlterTable
ALTER TABLE "qrCode" DROP CONSTRAINT "qrCode_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "student_id" SET DATA TYPE TEXT,
ALTER COLUMN "laboratory_id" SET DATA TYPE TEXT,
ALTER COLUMN "sub_event_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "qrCode_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "qrCode_id_seq";

-- AlterTable
ALTER TABLE "register" DROP CONSTRAINT "register_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "qr_code_id" SET DATA TYPE TEXT,
ALTER COLUMN "academic_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "register_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "register_id_seq";

-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "students_id_seq";

-- AlterTable
ALTER TABLE "sub_event" DROP CONSTRAINT "sub_event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "event_id" SET DATA TYPE TEXT,
ALTER COLUMN "group_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "sub_event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "sub_event_id_seq";

-- AddForeignKey
ALTER TABLE "qrCode" ADD CONSTRAINT "qrCode_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qrCode" ADD CONSTRAINT "qrCode_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qrCode" ADD CONSTRAINT "qrCode_sub_event_id_fkey" FOREIGN KEY ("sub_event_id") REFERENCES "sub_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "register" ADD CONSTRAINT "register_qr_code_id_fkey" FOREIGN KEY ("qr_code_id") REFERENCES "qrCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "register" ADD CONSTRAINT "register_academic_id_fkey" FOREIGN KEY ("academic_id") REFERENCES "academics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_event" ADD CONSTRAINT "sub_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_event" ADD CONSTRAINT "sub_event_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advice" ADD CONSTRAINT "advice_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advice" ADD CONSTRAINT "advice_sub_event_id_fkey" FOREIGN KEY ("sub_event_id") REFERENCES "sub_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
