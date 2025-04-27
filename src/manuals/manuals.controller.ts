import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('manuals')
export class ManualsController {
  constructor(private readonly manualsService: ManualsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'document', maxCount: 1 },
      { name: 'documentName' },
    ]),
  )

  create(
    @UploadedFiles()
    files: {
      document?: any;
    },
    @Body() body: { documentName: string }
  ) {
    return this.manualsService.create(body.documentName, files.document[0]);
  }

  @Get()
  findAll() {
    return this.manualsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manualsService.remove(+id);
  }
}
