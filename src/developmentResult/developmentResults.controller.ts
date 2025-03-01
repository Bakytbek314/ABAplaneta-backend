import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { DevelopmentResultsService } from "./developmentResults.service";
import { DevelopmentResultDto } from "./dto/developmentResult.dto";
import { Role } from "src/auth/role/role.enum";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/role/role.decorator";
import { RolesGuard } from "src/auth/role/roles.guard";

@Controller("development")
export class DevelopmentResultsController {
    constructor(private developmentResultsService: DevelopmentResultsService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async createDevelopmentResult(@Body() developmentResult: DevelopmentResultDto) {
        return this.developmentResultsService.createDevelopmentResult(developmentResult);
    }
}