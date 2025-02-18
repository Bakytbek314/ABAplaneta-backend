import { Module } from "@nestjs/common";
import { DevelopmentResultsController } from "./developmentResults.controller";
import { DevelopmentResultsService } from "./developmentResults.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [DevelopmentResultsService],
    controllers: [DevelopmentResultsController],
    exports: [DevelopmentResultsService]
})
export class DevelopmentResultsModule {}