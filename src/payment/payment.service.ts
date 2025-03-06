import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDebtDto } from './dto/createDebt.dto';
import { CreatePaymentDto } from './dto/createPayment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { patientId, amount } = createPaymentDto;
    
    const payment = await this.prisma.payment.create({
      data: {
        patientId,
        amount,
        status: 'PAID',
        paymentDate: new Date(),
      },
    });

    const debt = await this.prisma.debt.findFirst({
      where: { patientId, isPaid: false },
      orderBy: { createdAt: 'asc' },
    });

    if (debt) {
      const newAmount = debt.amount - amount;
      await this.prisma.debt.update({
        where: { id: debt.id },
        data: {
          amount: newAmount > 0 ? newAmount : 0,
          isPaid: newAmount <= 0,
          paymentId: newAmount <= 0 ? payment.id : null,
        },
      });
    }

    return payment;
  }

  async createDebt(createDebtDto: CreateDebtDto) {
    const { patientId, amount } = createDebtDto;
    return this.prisma.debt.create({
      data: {
        patientId,
        amount: amount,
        isPaid: false,
      },
    });
  }
}
