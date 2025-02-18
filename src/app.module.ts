import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SchedulesAndSessionsModule } from './schedulesAndSessions/schedulesAndSessions.module';
import { DevelopmentResultsModule } from './developmentResult/developmentResults.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    SchedulesAndSessionsModule,
    DevelopmentResultsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ]
})
export class AppModule {}
