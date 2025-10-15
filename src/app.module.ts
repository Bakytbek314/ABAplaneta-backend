import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SessionsModule } from './sessions/sessions.module';
import { DevelopmentResultsModule } from './developmentResult/developmentResults.module';
import { PaymentModule } from './payment/payment.module';
import { SpecialistCardModule } from './specialist-card/specialist-card.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GalleryModule } from './gallery/gallery.module';
import { ManualsModule } from './manuals/manuals.module';
import { PostsModule } from './posts/posts.module';
import *as path from 'path';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    DevelopmentResultsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PaymentModule,
    SpecialistCardModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    GalleryModule,
    ManualsModule,
    PostsModule,
  ]
})
export class AppModule {}
