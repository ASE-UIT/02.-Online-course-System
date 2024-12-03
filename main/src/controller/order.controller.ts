import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CreateOrderReq } from '@/dto/order/create-order.req';
import { Order } from '@/models/order.model';
import { IOrderService } from '@/service/interface/i.order.service';
import { ITYPES } from '@/types/interface.types';
import { SessionUtil } from '@/utils/session.util';
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

  /**
   * * POST /create-order
   */
  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);

      const createOrderReq: CreateOrderReq = req.body;

      await this.orderService.createOrder(createOrderReq, student.id);

      res.send_ok('Tạo đơn mua khóa học thành công, vui lòng thanh toán');
    } catch (error) {
      next(error);
    }
  };

  /**
   * * GET /get-order
   */
  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);

      const studentId = student.id;

      const order = await this.orderService.findMany({
        relations: ['items'],
        filter: {
          studentId: studentId
        }
      });

      res.send_ok('Lấy thông tin đơn hàng thành công', order);
    } catch (error) {
      next(error);
    }
  }
}
