import { PagingDto } from '@/dto/paging.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { IBaseRepository } from '@/repository/interface/i.base.repository';
import { DeleteResultType } from '@/types/delete-result.types';
import { ITYPES } from '@/types/interface.types';
import { RecordOrderType } from '@/types/record-order.types';
import { UpdateResultType } from '@/types/update-result.types';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DeepPartial, IsNull, ObjectLiteral, Repository } from 'typeorm';

@injectable()
export class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
  protected ormRepository!: Repository<T>;

  constructor(
    @inject(ITYPES.OrmRepository)
    ormRepository: Repository<T>
  ) {
    this.ormRepository = ormRepository;
  }

  async create(payload: { data: DeepPartial<T> }): Promise<T> {
    const data = payload.data;
    const result = await this.ormRepository.save(data);
    return result;
  }

  async findOneAndDelete(options: { filter: Partial<T> }): Promise<void> {
    const { filter } = options;
    const recordToDelete = await this.ormRepository.findOne({
      where: filter
    });
    if (!recordToDelete) {
      throw new BaseError(ErrorCode.NF_01, 'Record not found with given filter: ' + JSON.stringify(filter));
    }
    (recordToDelete as any).deleteAt = new Date();
    await this.ormRepository.save(recordToDelete);
  }

  async findOneAndUpdate(options: { filter: Partial<T>; updateData: Partial<T> }): Promise<void> {
    const { filter, updateData } = options;

    if (filter && !filter.deleteAt) {
      (filter as any).deleteAt = IsNull();
    }

    const recordToUpdate = await this.ormRepository.findOne({
      where: filter
    });

    if (!recordToUpdate) {
      throw new BaseError(ErrorCode.NF_01, 'Record not found with given filter: ' + JSON.stringify(filter));
    }

    const primaryKey = await this.ormRepository.getId(recordToUpdate);

    await this.ormRepository.update(primaryKey, updateData);
  }

  async findOne(options: { filter: Partial<T>; relations?: string[] }): Promise<T | null> {
    const { filter, relations } = options;

    if (!filter.deleteAt) {
      (filter as any).deleteAt = IsNull();
    }

    const result = await this.ormRepository.findOne({
      where: filter,
      relations: relations
    });
    if (!result) {
      throw new BaseError(ErrorCode.NF_01, 'Record not found with given filter: ' + JSON.stringify(filter));
    }
    return result;
  }

  async findMany(options: {
    filter?: Partial<T>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
  }): Promise<T[]> {
    const { paging, order, relations } = options;
    let { filter } = options;

    let skip = undefined;
    let take = undefined;
    if (paging) {
      skip = (paging.page - 1) * paging.page;
      take = paging.rpp;
    }

    if (filter && !filter.deleteAt) {
      (filter as any).deleteAt = IsNull();
    }

    if (!filter) {
      (filter as any) = {
        deleteAt: IsNull()
      };
    }

    const orderObject: Record<string, 'ASC' | 'DESC'> = {};
    if (order) {
      order.forEach((o) => {
        orderObject[o.column] = o.direction;
      });
    }
    const result = await this.ormRepository.find({
      where: filter,
      take: take,
      skip: skip,
      order: orderObject as any,
      relations: relations
    });
    return result;
  }

  async findAll(): Promise<T[]> {
    const filter: Partial<T> = {};
    (filter as any).deleteAt = IsNull();

    return await this.ormRepository.find({
      where: filter
    });
  }

  async count(options: { filter?: Partial<T> }): Promise<number> {
    const { filter } = options;

    if (filter && !filter.deleteAt) {
      (filter as any).deleteAt = IsNull();
    }

    if (!filter) {
      (filter as any) = {
        deleteAt: IsNull()
      };
    }

    console.log('count filter', filter);

    return await this.ormRepository.count({
      where: filter
    });
  }

  async exists(options: { filter: Partial<T> }): Promise<boolean> {
    const { filter } = options;

    if (filter && !filter.deleteAt) {
      (filter as any).deleteAt = IsNull();
    }

    const total = await this.ormRepository.count({
      where: filter
    });
    return total > 0;
  }
}
