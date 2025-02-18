-- AlterTable
ALTER TABLE "group_sessions" ALTER COLUMN "first_stage_end_time" SET DEFAULT '00:00',
ALTER COLUMN "first_stage_start_time" SET DEFAULT '00:00',
ALTER COLUMN "second_stage_end_time" SET DEFAULT '00:00',
ALTER COLUMN "second_stage_start_time" SET DEFAULT '00:00',
ALTER COLUMN "stream_number" SET DEFAULT 1;
