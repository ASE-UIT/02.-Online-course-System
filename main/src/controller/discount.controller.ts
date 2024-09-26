import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Discount } from '@/models/discount.model';
import { IDiscountService } from '@/service/interface/i.discount.service';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';

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
}
