import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IndividualSessionsService } from './individualSessions.service';
import { CreateIndividualSessionsDto } from '../dto/create-individual-sessions.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';

@Controller('sessions')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.ADMIN)
export class IndividulSessionsController {
  constructor(private individualSessionsService: IndividualSessionsService) {}

  @Get('individual')
  async getIndividualSessions() {
    return this.individualSessionsService.findAllIndividualSessions();
  }

  @Post('individual')
  async createIndividualSession(
    @Body() dto: CreateIndividualSessionsDto,
  ) {
    return this.individualSessionsService.createIndividualSession(
      dto,
    );
  }

  @Delete('individual/:id')
  async deleteIndividualSession(@Param('id') id: number) {
    return this.individualSessionsService.deleteIndividualSession(+id);
  }
}
