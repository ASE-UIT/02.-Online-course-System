import { IStatisticalRepository } from '@/repository/interface/i.statistical.repository';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';

@injectable()
export class StatisticalRepository implements IStatisticalRepository {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {}
}
