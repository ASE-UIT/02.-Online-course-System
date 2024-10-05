import { Discount } from '@/models/discount.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import { DataSource } from 'typeorm';

export class DiscountRepository extends BaseRepository<Discount> implements IDiscountRepository<Discount> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Discount));
  }
}
