import { PagingDto } from '@/dto/paging.dto';
import { DeleteResultType } from '@/types/delete-result.types';
import { RecordOrderType } from '@/types/record-order.types';
import { UpdateResultType } from '@/types/update-result.types';
import { DeepPartial } from 'typeorm';

export interface IBaseRepository<T> {
  /**
   * Create a new record with the given data
   * @param data
   * @returns The created record
   */
  create(payload: { data: DeepPartial<T> }): Promise<T>;

  /**
   * Find a record by the given filter and delete it
   * @param filter
   * @returns The deleted record
   */
  findOneAndDelete(options: { filter: Partial<T> }): Promise<void>;

  /**
   * Find a record by the given filter and update it
   * @param filter
   * @param updateData
   * @returns The updated success message
   */
  findOneAndUpdate(options: { filter: Partial<T>; updateData: Partial<T> }): Promise<void>;

  /**
   * Find a record by the given filter
   * @param filter
   * @returns The record with given filter
   */
  findOne(options: { filter: Partial<T>; relations?: string[] }): Promise<T | null>;

  /**
   * Find all records by the given filter
   * @param filter
   * @returns The records with given filter
   */
  findMany(options: {
    filter?: Partial<T>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
  }): Promise<T[]>;

  /**
   * Find all records
   */
  findAll(): Promise<T[]>;

  /**
   * Count records by the given filter
   * @param filter
   * @returns The number of records with given filter
   */
  count(options: { filter?: Partial<T> }): Promise<number>;

  /**
   * Check if a record exists with the given filter
   * @param filter
   */
  exists(options: { filter: Partial<T> }): Promise<boolean>;
}
