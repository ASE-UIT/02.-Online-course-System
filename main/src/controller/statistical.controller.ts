import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { IStatisticalService } from '@/service/interface/i.statistical.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class StatisticalController {
  private statisticalService: IStatisticalService;
  constructor(@inject('StatisticalService') statisticalService: IStatisticalService) {
    this.statisticalService = statisticalService;
  }
}
