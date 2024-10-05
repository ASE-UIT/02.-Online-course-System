import { Discount } from '@/models/discount.model';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IDiscountService } from '@/service/interface/i.discount.service';
import { inject, injectable } from 'inversify';

@injectable()
export class DiscountService extends BaseCrudService<Discount> implements IDiscountService<Discount> {
  private discountRepository: IDiscountRepository<Discount>;
  constructor(@inject('DiscountRepository') discountRepository: IDiscountRepository<Discount>) {
    super(discountRepository);
    this.discountRepository = discountRepository;
  }
}
