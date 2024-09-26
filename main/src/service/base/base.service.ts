import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { IBaseRepository } from '@/repository/interface/i.base.repository';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { ITYPES } from '@/types/interface.types';
import { Page } from '@/types/page.types';
import { RecordOrderType } from '@/types/record-order.types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DeepPartial } from 'typeorm';
@injectable()
export class BaseCrudService<MODEL> implements IBaseCrudService<MODEL> {
  protected baseRepository: IBaseRepository<MODEL>;
  constructor(@inject(ITYPES.Repository) baseRepository: IBaseRepository<MODEL>) {
    this.baseRepository = baseRepository;
  }
  async create<DTO>(payload: { data: DeepPartial<MODEL> }): Promise<MODEL> {
    console.log('payload', payload);

    return await this.baseRepository.create({
      data: payload.data
    });
  }
  async findOneAndDelete(options: { filter: Partial<MODEL> }): Promise<void> {
    return await this.baseRepository.findOneAndDelete({
      filter: options.filter
    });
  }
  async findOneAndUpdate(options: { filter: Partial<MODEL>; updateData: Partial<MODEL> }): Promise<void> {
    return await this.baseRepository.findOneAndUpdate({
      filter: options.filter,
      updateData: options.updateData
    });
  }
  async findAll(): Promise<MODEL[]> {
    return await this.baseRepository.findAll();
  }
  async findMany(options: {
    filter?: Partial<MODEL>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
  }): Promise<MODEL[]> {
    return await this.baseRepository.findMany(options);
  }

  async findOne(options: { filter: Partial<MODEL>; relations?: string[] }): Promise<MODEL | null> {
    return await this.baseRepository.findOne(options);
  }
  async findAllWithPagingAndOrder(options: {
    paging: PagingDto;
    order: RecordOrderType;
  }): Promise<PagingResponseDto<MODEL>> {
    const contents = await this.baseRepository.findMany({
      paging: options.paging,
      order: [options.order]
    });

    const totalRecords = await this.baseRepository.count({
      filter: {}
    });
    return {
      items: contents,
      total: totalRecords
    };
  }

  async findAllWithPaging(options: { paging: PagingDto }): Promise<PagingResponseDto<MODEL>> {
    const contents = await this.baseRepository.findMany({
      paging: options.paging
    });
    const totalRecords = await this.baseRepository.count({
      filter: {}
    });
    return {
      items: contents,
      total: totalRecords
    };
  }

  async count(options: { filter?: Partial<MODEL> }): Promise<number> {
    return await this.baseRepository.count(options);
  }

  async exists(options: { filter: Partial<MODEL> }): Promise<boolean> {
    return await this.baseRepository.exists(options);
  }
}
