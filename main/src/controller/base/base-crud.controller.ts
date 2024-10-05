import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PagingDto } from '@/dto/paging.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { ITYPES } from '@/types/interface.types';
import { Page } from '@/types/page.types';
import BaseError from '@/utils/error/base.error';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class BaseCrudController<MODEL> implements IBaseCrudController<MODEL> {
  public service: IBaseCrudService<MODEL>;
  constructor(@inject(ITYPES.Service) service: IBaseCrudService<MODEL>) {
    this.service = service;
  }
  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params.id) throw new BaseError(ErrorCode.NF_01, 'Id is required');
      const id = req.params.id;
      const result = await (this.service as any).findOne({
        filter: { id: id }
      });
      res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.service.findAll();
      console.log(result);

      return res.send_ok('Found successfully', result!);
    } catch (error) {
      next(error);
    }
  }
  async findWithPaging(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, rpp } = req.query;
      const paging = new PagingDto(Number(page), Number(rpp));
      const result = await this.service.findAllWithPaging({ paging });
      res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.service.create({ data: req.body });
      res.send_created('Created successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params.id) throw new Error('Id is required');
      const id = req.params.id;
      const result = await (this.service as any).findOneAndUpdate({
        filter: { id: id },
        updateData: req.body
      });
      res.send_ok('Updated successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params.id) throw new Error('Id is required');
      const id = req.params.id;
      const result = await (this.service as any).findOneAndDelete({
        filter: { id: id }
      });
      res.send_ok('Deleted successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
