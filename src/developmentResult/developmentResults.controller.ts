import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { DevelopmentResultsService } from "./developmentResults.service";
import { DevelopmentResultDto } from "./dto/developmentResult.dto";

@Controller("development")
export class DevelopmentResultsController {
    constructor(private developmentResultsService: DevelopmentResultsService) {}

    @Post()
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN)
    async createDevelopmentResult(@Body() developmentResult: DevelopmentResultDto) {
        return this.developmentResultsService.createDevelopmentResult(developmentResult);
    }
}