import { Cart } from '@/models/cart.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class CartRepository extends BaseRepository<Cart> implements ICartRepository<Cart> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Cart));
  }
}
