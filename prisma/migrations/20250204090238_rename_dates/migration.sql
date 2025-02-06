/*
  Warnings:

  - You are about to drop the column `date` on the `group_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `group_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `day` to the `group_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `group_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `group_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group_sessions" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "time",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
