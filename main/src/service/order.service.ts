import { Order } from '@/models/order.model';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IOrderService } from '@/service/interface/i.order.service';
import { inject, injectable } from 'inversify';

@injectable()
export class OrderService extends BaseCrudService<Order> implements IOrderService<Order> {
  private orderRepository: IOrderRepository<Order>;

  constructor(@inject('OrderRepository') orderRepository: IOrderRepository<Order>) {
    super(orderRepository);
    this.orderRepository = orderRepository;
  }
}
