-- CreateEnum
CREATE TYPE "tier" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "phone" INTEGER NOT NULL,
    "RA" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "phone" INTEGER NOT NULL,
    "RA" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qrCode" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "laboratory_id" INTEGER NOT NULL,
    "sub_event_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "qrCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "register" (
    "id" SERIAL NOT NULL,
    "qr_code_id" INTEGER NOT NULL,
    "academic_id" INTEGER NOT NULL,

    CONSTRAINT "register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laboratory" (
    "id" SERIAL NOT NULL,
    "local" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "laboratory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_event" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advice" (
    "id" SERIAL NOT NULL,
    "laboratory_id" INTEGER NOT NULL,
    "sub_event_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tier" "tier" NOT NULL DEFAULT 'low',

    CONSTRAINT "advice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_phone_key" ON "students"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "students_RA_key" ON "students"("RA");

-- CreateIndex
CREATE UNIQUE INDEX "academics_email_key" ON "academics"("email");

-- CreateIndex
CREATE UNIQUE INDEX "academics_phone_key" ON "academics"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "academics_RA_key" ON "academics"("RA");

-- CreateIndex
CREATE UNIQUE INDEX "qrCode_student_id_key" ON "qrCode"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "qrCode_laboratory_id_key" ON "qrCode"("laboratory_id");

-- CreateIndex
CREATE UNIQUE INDEX "qrCode_sub_event_id_key" ON "qrCode"("sub_event_id");

-- CreateIndex
CREATE UNIQUE INDEX "register_qr_code_id_key" ON "register"("qr_code_id");

-- CreateIndex
CREATE UNIQUE INDEX "register_academic_id_key" ON "register"("academic_id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_event_event_id_key" ON "sub_event"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_event_group_id_key" ON "sub_event"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "advice_laboratory_id_key" ON "advice"("laboratory_id");

-- CreateIndex
CREATE UNIQUE INDEX "advice_sub_event_id_key" ON "advice"("sub_event_id");

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
