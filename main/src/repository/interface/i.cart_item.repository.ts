import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface ICartItemRepository<T> extends IBaseRepository<T> {
  cleanCart(cartId: string): Promise<void>;
}
