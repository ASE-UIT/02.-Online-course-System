import { Order } from '@/models/order.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class OrderRepository extends BaseRepository<Order> implements IOrderRepository<Order> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Order));
  }
}
