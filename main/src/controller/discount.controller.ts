import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Discount } from '@/models/discount.model';
import { IDiscountService } from '@/service/interface/i.discount.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import { DiscountRes } from '../dto/discount/discount.res';
import { filter } from 'lodash';
import { PagingDto } from '@/dto/paging.dto';
import { PagingResponseDto } from '@/dto/paging-response.dto';

@injectable()
export class DiscountController {
  public common: IBaseCrudController<Discount>;
  private discountService: IDiscountService<Discount>;
  constructor(
    @inject('DiscountService') discountService: IDiscountService<Discount>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Discount>
  ) {
    this.discountService = discountService;
    this.common = common;
  }

  public async softdelete(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // Lấy ID từ tham số URL

    try {
      await this.discountService.softdelete(id); // Gọi hàm softDelete từ DiscountService
      res.status(204).send(); // Trả về trạng thái 204 No Content
    } catch (error) {
      res.status(400).json({ message: error }); // Trả về lỗi nếu có
    }
  }

  /**
   * * POST /discount/create
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const result = await this.discountService.create({
        data: data
      });
      const resultDto = convertToDto(DiscountRes, result);
      res.send_ok('Create successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const discounts = await this.discountService.findAll();
      const resultDto = convertToDto(DiscountRes, discounts);
      res.send_ok('Get all discounts successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }
  async findAllWithPaging(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const rpp = parseInt(req.query.rpp as string) || 10;

      const paging = new PagingDto(page, rpp);

      const response: PagingResponseDto<Discount> = await this.discountService.findAllWithPaging({ paging: paging });
      res.send_ok('Get all discounts successfully', response);
    } catch (error) {
      next(error);
    }
  }
}
