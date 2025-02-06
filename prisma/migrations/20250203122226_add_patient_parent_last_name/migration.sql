/*
  Warnings:

  - Added the required column `parent_last_name` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "parent_last_name" TEXT NOT NULL;
