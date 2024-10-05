import { Cart } from '@/models/cart.model';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICartService } from '@/service/interface/i.cart.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CartService extends BaseCrudService<Cart> implements ICartService<Cart> {
  private cartRepository: ICartRepository<Cart>;

  constructor(@inject('CartRepository') cartRepository: ICartRepository<Cart>) {
    super(cartRepository);
    this.cartRepository = cartRepository;
  }
}
