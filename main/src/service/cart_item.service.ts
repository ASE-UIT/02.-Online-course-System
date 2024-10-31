import { CartItem } from '@/models/cart_item.model';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICartItemService } from '@/service/interface/i.cart_item.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CartItemService extends BaseCrudService<CartItem> implements ICartItemService<CartItem> {
  private cartItemRepository: ICartItemRepository<CartItem>;

  constructor(@inject('CartItemRepository') cartItemRepository: ICartItemRepository<CartItem>) {
    super(cartItemRepository);
    this.cartItemRepository = cartItemRepository;
  }
}
