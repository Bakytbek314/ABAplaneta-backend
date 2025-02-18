import { Body, Controller, Post } from "@nestjs/common";
import { DevelopmentResultsService } from "./developmentResults.service";
import { DevelopmentResultDto } from "./dto/developmentResult.dto";

@Controller("development")
export class DevelopmentResultsController {
    constructor(private developmentResultsService: DevelopmentResultsService) {}

    @Post()
    async createDevelopmentResult(@Body() developmentResult: DevelopmentResultDto) {
        return this.developmentResultsService.createDevelopmentResult(developmentResult);
    }
}