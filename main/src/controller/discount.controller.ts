import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Discount } from '@/models/discount.model';
import { IDiscountService } from '@/service/interface/i.discount.service';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';
import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import { Request, Response, NextFunction } from 'express';



@injectable()
export class DiscountController {
  public common: IBaseCrudController<Discount>;
  private discountService: IDiscountService<Discount>;
  constructor(
    @inject('DiscountService') discountService: IDiscountService<Discount>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Discount>
  ) {
    this.discountService = discountService;
    this.common = common;
  }
  public async softdelete(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // Lấy ID từ tham số URL

    try {
        await this.discountService.softdelete(id); // Gọi hàm softDelete từ DiscountService
        res.status(204).send(); // Trả về trạng thái 204 No Content
    } catch (error) {
        res.status(400).json({ message: error }); // Trả về lỗi nếu có
    }
  }
}
