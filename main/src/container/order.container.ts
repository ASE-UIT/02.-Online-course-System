import { OrderController } from '@/controller/order.controller';
import { OrderService } from '@/service/order.service';
import { Order } from '@/models/order.model';
import { OrderRepository } from '@/repository/order.repository';
import { IOrderService } from '@/service/interface/i.order.service';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { BaseContainer } from '@/container/base.container';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { discountRepository } from '@/container/discount.container';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { cartRepository } from '@/container/cart.container';

class OrderContainer extends BaseContainer {
  constructor() {
    super(Order);
    this.container.bind<IOrderService<Order>>('OrderService').to(OrderService);
    this.container.bind<IOrderRepository<Order>>('OrderRepository').to(OrderRepository);
    this.container.bind<OrderController>(OrderController).toSelf();

    //Import
    this.container.bind<IDiscountRepository<any>>('DiscountRepository').toConstantValue(discountRepository);
    this.container.bind<ICartRepository<any>>('CartRepository').toConstantValue(cartRepository);
  }

  export() {
    const orderController = this.container.get<OrderController>(OrderController);
    const orderService = this.container.get<IOrderService<any>>('OrderService');
    const orderRepository = this.container.get<IOrderRepository<any>>('OrderRepository');
    return { orderController, orderService, orderRepository };
  }
}

const orderContainer = new OrderContainer();
const { orderController, orderService, orderRepository } = orderContainer.export();
export { orderController, orderService, orderRepository };
