import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IndividulSessionsController } from './individual/individualSessions.controller';
import { GroupSessionsController } from './group/groupSessions.controller';
import { IndividualSessionsService } from './individual/individualSessions.service';
import { GroupSessionsService } from './group/groupSessions.service';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  imports: [PrismaModule],
  controllers: [IndividulSessionsController, GroupSessionsController],
  providers: [IndividualSessionsService, GroupSessionsService, SchedulerService],
  exports: [IndividualSessionsService, GroupSessionsService],
})
export class SessionsModule {}
