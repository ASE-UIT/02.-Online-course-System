import { CartItemService } from '@/service/cart_item.service';
import { CartItem } from '@/models/cart_item.model';
import { CartItemRepository } from '@/repository/cart_item.repository';
import { ICartItemService } from '@/service/interface/i.cart_item.service';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { BaseContainer } from '@/container/base.container';

class CartItemContainer extends BaseContainer {
  constructor() {
    super(CartItem);
    this.container.bind<ICartItemService<CartItem>>('CartItemService').to(CartItemService);
    this.container.bind<ICartItemRepository<CartItem>>('CartItemRepository').to(CartItemRepository);
  }

  export() {
    const cartItemService = this.container.get<ICartItemService<any>>('CartItemService');
    const cartItemRepository = this.container.get<ICartItemRepository<any>>('CartItemRepository');
    return { cartItemRepository, cartItemService };
  }
}

const cartItemContainer = new CartItemContainer();
const { cartItemRepository, cartItemService } = cartItemContainer.export();
export { cartItemRepository, cartItemService };
