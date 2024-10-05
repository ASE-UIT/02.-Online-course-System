import { BaseContainer } from '@/container/base.container';
import { DiscountController } from '@/controller/discount.controller';
import { Discount } from '@/models/discount.model';
import { DiscountRepository } from '@/repository/discount.repository';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { DiscountService } from '@/service/discount.service';
import { IDiscountService } from '@/service/interface/i.discount.service';

class DiscountContainer extends BaseContainer {
  constructor() {
    super(Discount);
    this.container.bind<IDiscountService<Discount>>('DiscountService').to(DiscountService);
    this.container.bind<IDiscountRepository<Discount>>('DiscountRepository').to(DiscountRepository);
    this.container.bind<DiscountController>(DiscountController).toSelf();
  }
  export() {
    const discountController = this.container.get<DiscountController>(DiscountController);
    const discountService = this.container.get<IDiscountService<any>>('DiscountService');
    return { discountController, discountService };
  }
}

const discountContainer = new DiscountContainer();
const { discountController, discountService } = discountContainer.export();
export { discountController, discountService };
