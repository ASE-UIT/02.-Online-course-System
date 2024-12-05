import { Payment } from '@/models/payment.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PaymentRepository extends BaseRepository<Payment> implements IPaymentRepository<Payment> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Payment));
  }
  async findByOrderId(orderId: string): Promise<Payment | null> {
    return await this.ormRepository.findOne({
      where: {
        order: {
          id: orderId
        }
      }
    });
  }
}
