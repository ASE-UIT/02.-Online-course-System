import { OrderController } from '@/controller/order.controller';
import { OrderService } from '@/service/order.service';
import { Order } from '@/models/order.model';
import { OrderRepository } from '@/repository/order.repository';
import { IOrderService } from '@/service/interface/i.order.service';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { BaseContainer } from '@/container/base.container';

class OrderContainer extends BaseContainer {
  constructor() {
    super(Order);
    this.container.bind<IOrderService<Order>>('OrderService').to(OrderService);
    this.container.bind<IOrderRepository<Order>>('OrderRepository').to(OrderRepository);
    this.container.bind<OrderController>(OrderController).toSelf();
  }

  export() {
    const orderController = this.container.get<OrderController>(OrderController);
    const orderService = this.container.get<IOrderService<any>>('OrderService');
    return { orderController, orderService };
  }
}

const orderContainer = new OrderContainer();
const { orderController, orderService } = orderContainer.export();
export { orderController, orderService };
