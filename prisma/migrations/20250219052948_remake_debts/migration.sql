/*
  Warnings:

  - A unique constraint covering the columns `[payment_id]` on the table `debt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "debt" ADD COLUMN     "payment_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "debt_payment_id_key" ON "debt"("payment_id");

-- AddForeignKey
ALTER TABLE "debt" ADD CONSTRAINT "debt_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
