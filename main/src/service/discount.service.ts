import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
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
  async findAll(): Promise<Discount[]> {
    return await this.discountRepository.findAll();
  }
  async findAllWithPaging(options: { paging: PagingDto }): Promise<PagingResponseDto<Discount>> {
    const contents: Discount[] = await this.baseRepository.findMany({
      filter: {},
      paging: options.paging
    });

    const totalRecords = await this.baseRepository.count({
      filter: {}
    });

    return new PagingResponseDto<Discount>(totalRecords, contents);
  }
}
