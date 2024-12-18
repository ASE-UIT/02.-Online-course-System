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
import { CreateOrderRes } from '@/dto/order/create-order.res';
import { getSearchData } from '@/utils/get-search-data.util';
import { CreateOrderWithCourseIdsReq } from '@/dto/order/create-order-with-course-ids.req';

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

      const order = await this.orderService.createOrder(createOrderReq, student.id);

      const resultDto = convertToDto(CreateOrderRes, order);

      res.send_ok('Tạo đơn mua khóa học thành công, vui lòng thanh toán', resultDto);
    } catch (error) {
      next(error);
    }
  };

  /**
   * * GET /get-my-order
   */

  public getMyOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);
      const searchData = getSearchData(req);

      console.log('searchData', searchData);

      const order = await this.orderService.getMyOrders(student.id, searchData);

      res.send_ok('Lấy thông tin đơn hàng thành công', order);
    } catch (error) {
      next(error);
    }
  };

  /**
   * * POST /create-order/with-course-ids
   */
  async createOrderWithCourseIds(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);

      const requestBody: CreateOrderWithCourseIdsReq = req.body;

      const order = await this.orderService.createOrderWithCourseIds(requestBody, student.id);

      const resultDto = convertToDto(CreateOrderRes, order);

      res.send_ok('Tạo đơn mua khóa học thành công, vui lòng thanh toán', resultDto);
    } catch (error) {
      next(error);
    }
  }
}
