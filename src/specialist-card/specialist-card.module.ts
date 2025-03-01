import { Module } from '@nestjs/common';
import { SpecialistCardService } from './specialist-card.service';
import { SpecialistCardController } from './specialist-card.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule, FileModule],
  controllers: [SpecialistCardController],
  providers: [SpecialistCardService],
  exports: [SpecialistCardService]
})
export class SpecialistCardModule {}
