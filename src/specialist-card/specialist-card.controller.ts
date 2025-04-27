import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Delete,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { SpecialistCardService } from './specialist-card.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/auth/role/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';

@Controller('specialist-card')
export class SpecialistCardController {
  constructor(private specialistCardService: SpecialistCardService) {}

  @Get()
  async findAll() {
    return this.specialistCardService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'diplomaPhoto', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      photo: any;
      diplomaPhoto: any;
    },
    @Body() body: { specialistId: number; description: string },
  ) {
    return this.specialistCardService.create(
      +body.specialistId,
      body.description,
      files.photo[0],
      files.diplomaPhoto[0],
    );
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'diplomaPhoto', maxCount: 1 },
    ]),
  )
  async update(
    @UploadedFiles()
    files: {
      photo?: any;
      diplomaPhoto?: any;
    },
    @Body() body: { specialistId: number; description: string },
  ) {
    return this.specialistCardService.update(
      +body.specialistId,
      body.description,
      files?.photo?.[0],
      files?.diplomaPhoto?.[0],
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: number) {
    return this.specialistCardService.delete(+id);
  }
}
