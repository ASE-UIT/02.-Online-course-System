import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Discount } from '@/models/discount.model';
import { IDiscountService } from '@/service/interface/i.discount.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { DiscountRes } from '../dto/discount/discount.res';
import { filter } from 'lodash';

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

  /**
   * * POST /discount/create
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const result = await this.discountService.create({
        data: data
      });
      const resultDto = convertToDto(DiscountRes, result);
      res.send_ok('Create successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }
}
