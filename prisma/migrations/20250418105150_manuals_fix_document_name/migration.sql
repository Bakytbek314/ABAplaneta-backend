/*
  Warnings:

  - You are about to drop the column `name` on the `manuals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "manuals" DROP COLUMN "name",
ADD COLUMN     "document_name" TEXT NOT NULL DEFAULT 'Безымя́нный';
