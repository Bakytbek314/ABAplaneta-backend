import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateDebtDto } from './dto/createDebt.dto';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';

@Controller('payment')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    console.log("createPaymentDto>>>", createPaymentDto);
    
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Post("debt")
  async createDebt(@Body() createDebtDto: CreateDebtDto) {
    return this.paymentService.createDebt(createDebtDto);
  }
}
