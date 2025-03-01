import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GroupSessionsService } from './groupSessions.service';
import { CreateGroupSessionDto } from '../dto/create-group-session.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Role } from 'src/auth/role/role.enum';

@Controller('sessions')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.ADMIN)
export class GroupSessionsController {
  constructor(private groupSessionsService: GroupSessionsService) {}

  @Get('group')
  async getGroupSessions() {
    return this.groupSessionsService.findAllGroupSessions();
  }

  @Post('group')
  async createGroupSession(@Body() dto: CreateGroupSessionDto) {
    return this.groupSessionsService.createGroupSession(dto);
  }

  @Post('group/specialist')
  async addSpesialistToGroupSession(
    @Body() body: { sessionId: number; specialistId: number },
  ) {
    return this.groupSessionsService.addSpecialistToGroupSession(
      +body.sessionId,
      +body.specialistId,
    );
  }

  @Post('group/patient')
  async addPatientToGroupSession(
    @Body() body: { sessionId: number; patientId: number },
  ) {
    return this.groupSessionsService.addPatientToGroupSession(
      +body.sessionId,
      +body.patientId,
    );
  }

  @Delete('group/:id')
  async deleteGroupSessions(@Param('id') id: number) {
    return this.groupSessionsService.deleteGroupSessions(+id);
  }
}
