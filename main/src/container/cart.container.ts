import { CartController } from '@/controller/cart.controller';
import { CartService } from '@/service/cart.service';
import { Cart } from '@/models/cart.model';
import { CartRepository } from '@/repository/cart.repository';
import { ICartService } from '@/service/interface/i.cart.service';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { BaseContainer } from '@/container/base.container';

class CartContainer extends BaseContainer {
  constructor() {
    super(Cart);
    this.container.bind<ICartService<Cart>>('CartService').to(CartService);
    this.container.bind<ICartRepository<Cart>>('CartRepository').to(CartRepository);
    this.container.bind<CartController>(CartController).toSelf();
  }

  export() {
    const cartController = this.container.get<CartController>(CartController);
    const cartService = this.container.get<ICartService<any>>('CartService');
    return { cartController, cartService };
  }
}

const cartContainer = new CartContainer();
const { cartController, cartService } = cartContainer.export();
export { cartController, cartService };
