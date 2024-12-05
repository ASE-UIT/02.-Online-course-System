import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IPaymentRepository<T> extends IBaseRepository<T> {
  findByOrderId(orderId: string): Promise<T | null>;
}
