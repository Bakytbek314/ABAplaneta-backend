import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DevelopmentResultDto } from "./dto/developmentResult.dto";

@Injectable()
export class DevelopmentResultsService {
    constructor(private prisma: PrismaService) {}

    async createDevelopmentResult(developmentResult: DevelopmentResultDto) {
        const {
            patientId, 
            progress, 
            specialistId, 
            testResults 
        } = developmentResult;
        return this.prisma.developmentResult.create({
            data: {
                patientId: patientId,
                specialistId: specialistId,
                testResults: testResults,
                progress: progress
            }
        });
    }
}