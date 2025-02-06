import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchedulesAndSessionsService } from './schedulesAndSessions.service';
import { CreateIndividualSessionsDto } from './dto/create-individual-sessions.dto';
import { UpdateSessionsDto } from './dto/update-sessions.dto';
import { GroupSession, Schedule } from '@prisma/client';
import { CreateGroupSessionsDto } from './dto/create-group-sessions.dto';

@Controller('sessions')
export class SchedulesAndSessionsController {
  constructor(private readonly schedulesAndSessionsService: SchedulesAndSessionsService) {}

  @Get("individual")
  async getIndividualSessions() {
    return this.schedulesAndSessionsService.findAllIndividualSessions();
  }

  @Post("individual")
  async createIndividualSession(@Body() createIndividualSession: CreateIndividualSessionsDto): Promise<Schedule> {
    return this.schedulesAndSessionsService.createIndividualSession(createIndividualSession);
  }

  @Get("group")
  async getGroupsSessions() {
    return this.schedulesAndSessionsService.findAllGroupSessions();
  }

  @Post("group")
  async createGroupSession(@Body() createGroupSession: CreateGroupSessionsDto) {
    return this.schedulesAndSessionsService.createGroupSession(createGroupSession);
  }
}
