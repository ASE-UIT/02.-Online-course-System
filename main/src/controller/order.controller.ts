import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Order } from '@/models/order.model';
import { IOrderService } from '@/service/interface/i.order.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class OrderController {
  public common: IBaseCrudController<Order>;
  private orderService: IOrderService<Order>;
  constructor(
    @inject('OrderService') orderService: IOrderService<Order>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Order>
  ) {
    this.orderService = orderService;
    this.common = common;
  }
}
