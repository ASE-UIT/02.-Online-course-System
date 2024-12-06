import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ErrorCode } from '@/enums/error-code.enums';
import { Order } from '@/models/order.model';
import { Payment } from '@/models/payment.model';
import { IOrderService } from '@/service/interface/i.order.service';
import { IPaymentService } from '@/service/interface/i.payment.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { checkVnpReturnUtil } from '@/utils/vnpay/check-vnp-return.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import requestIp from 'request-ip';

@injectable()
export class PaymentController {
  public common: IBaseCrudController<Payment>;
  private paymentService: IPaymentService<Payment>;

  //Constants
  private FE_SUCCESS_PAYMENT_URL = 'https://eduhub.io.vn/web/checkout/success';

  constructor(
    @inject('PaymentService') paymentService: IPaymentService<Payment>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Payment>
  ) {
    this.paymentService = paymentService;
    this.common = common;
  }

  /**
   * * GET /vnp-url/:paymentId
   */
  async getVnpUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentId } = req.params;
      const ipAddr = requestIp.getClientIp(req);

      if (!ipAddr) {
        throw new BaseError(ErrorCode.VALIDATION_ERROR, 'IP Address not found');
      }

      const result = await this.paymentService.getVnpUrl(paymentId, ipAddr);

      return res.send_ok('Generate url success', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /vnp-return
   */
  async vnpReturn(req: Request, res: Response, next: NextFunction) {
    try {
      checkVnpReturnUtil(req);

      const vnp_Params = req.query;

      await this.paymentService.handleVNPayReturn(vnp_Params);

      return res.redirect(this.FE_SUCCESS_PAYMENT_URL);
    } catch (error) {
      next(error);
    }
  }
}
