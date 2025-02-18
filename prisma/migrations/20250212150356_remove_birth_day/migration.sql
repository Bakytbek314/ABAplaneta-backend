/*
  Warnings:

  - You are about to drop the column `birth_date` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `specialists` table. All the data in the column will be lost.
  - You are about to drop the column `salaryPercent` on the `specialists` table. All the data in the column will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patient_id` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_patientId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_specialistId_fkey";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "birth_date",
ADD COLUMN     "telephone_number" TEXT,
ALTER COLUMN "parent_first_name" DROP NOT NULL,
ALTER COLUMN "parent_last_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "patientId",
ADD COLUMN     "patient_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "specialists" DROP COLUMN "birth_date",
DROP COLUMN "salaryPercent",
ADD COLUMN     "salary_percent" DOUBLE PRECISION NOT NULL DEFAULT 50,
ADD COLUMN     "telephone_number" TEXT;

-- DropTable
DROP TABLE "schedule";

-- CreateTable
CREATE TABLE "individual_session" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "specialist_id" INTEGER NOT NULL,
    "patient_id" INTEGER,

    CONSTRAINT "individual_session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "individual_session" ADD CONSTRAINT "individual_session_specialist_id_fkey" FOREIGN KEY ("specialist_id") REFERENCES "specialists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individual_session" ADD CONSTRAINT "individual_session_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
