import { Module } from '@nestjs/common';
import { SchedulesAndSessionsService } from './schedulesAndSessions.service';
import { SchedulesAndSessionsController } from './schedulesAndSessions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SchedulesAndSessionsController],
  providers: [SchedulesAndSessionsService],
  exports: [SchedulesAndSessionsService],
})
export class SchedulesAndSessionsModule {}
