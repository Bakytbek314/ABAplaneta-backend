-- AlterTable
ALTER TABLE "group_sessions" ADD COLUMN     "main_specialist_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "group_sessions" ADD CONSTRAINT "group_sessions_main_specialist_id_fkey" FOREIGN KEY ("main_specialist_id") REFERENCES "specialists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
