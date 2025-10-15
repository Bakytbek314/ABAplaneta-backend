import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/auth/role/role.enum';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role/role.decorator';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
    ]),
  )
  async create(@UploadedFiles()
  files: {
    photo?: any;
  },) {
    return this.galleryService.create(files.photo[0]);
  }

  @Get()
  async findAll() {
    return this.galleryService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
