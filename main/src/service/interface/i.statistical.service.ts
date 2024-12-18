import { StatisticalRevenueRes } from '@/dto/statistical/statistical-revenue.res';
import { StatisticalRes } from '@/dto/statistical/statistical.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IStatisticalService {
  getStatistics(time: number): Promise<StatisticalRes>;
  getDailyRevenue(): Promise<StatisticalRevenueRes>;
  getWeekRevenue(): Promise<StatisticalRevenueRes>;
  getMonthRevenue(): Promise<StatisticalRevenueRes>;
}
