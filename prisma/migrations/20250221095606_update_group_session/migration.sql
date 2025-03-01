-- DropForeignKey
ALTER TABLE "group_sessions" DROP CONSTRAINT "group_sessions_main_specialist_id_fkey";

-- AlterTable
ALTER TABLE "group_sessions" ALTER COLUMN "main_specialist_id" DROP NOT NULL,
ALTER COLUMN "main_specialist_id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "group_sessions" ADD CONSTRAINT "group_sessions_main_specialist_id_fkey" FOREIGN KEY ("main_specialist_id") REFERENCES "specialists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
