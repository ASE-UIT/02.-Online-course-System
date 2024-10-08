import { PagingDto } from '@/dto/paging.dto';
import { Discount } from '@/models/discount.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { ITYPES } from '@/types/interface.types';
import { RecordOrderType } from '@/types/record-order.types';
import { inject } from 'inversify';
import { DataSource, IsNull, Not } from 'typeorm';

export class DiscountRepository extends BaseRepository<Discount> implements IDiscountRepository<Discount> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Discount));
  }
  async findAll(): Promise<Discount[]> {
    return await this.ormRepository.find({
      where: {
        deleteAt: Not(IsNull())
      }
    });
  }
}
