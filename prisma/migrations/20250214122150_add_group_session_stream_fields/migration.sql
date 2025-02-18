/*
  Warnings:

  - You are about to drop the column `endTime` on the `group_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `group_sessions` table. All the data in the column will be lost.
  - Added the required column `first_stage_end_time` to the `group_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_stage_start_time` to the `group_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stream_number` to the `group_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group_sessions" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "first_stage_end_time" TEXT NOT NULL,
ADD COLUMN     "first_stage_start_time" TEXT NOT NULL,
ADD COLUMN     "second_stage_end_time" TEXT,
ADD COLUMN     "second_stage_start_time" TEXT,
ADD COLUMN     "stream_number" INTEGER NOT NULL;