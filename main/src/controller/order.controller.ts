import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CreateOrderReq } from '@/dto/order/create-order.req';
import { OrderSelectRes } from '@/dto/order/order-select.res';
import { Order } from '@/models/order.model';
import { IOrderService } from '@/service/interface/i.order.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
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

  public getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);

      const order = await this.orderService.findMany({
        filter: {
          studentId: student.id
        },
        relations: ['items', 'items.course'],
        select: OrderSelectRes
      });

      res.send_ok('Lấy thông tin đơn hàng thành công', order);
    } catch (error) {
      next(error);
    }
  };
}
