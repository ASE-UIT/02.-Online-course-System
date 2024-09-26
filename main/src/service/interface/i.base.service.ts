import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { Page } from '@/types/page.types';
import { RecordOrderType } from '@/types/record-order.types';
import { DeepPartial } from 'typeorm';

export interface IBaseCrudService<MODEL> {
  /**
   * Create a new record with the given data
   * @param data
   * @returns The created record
   */
  create<DTO>(payload: { data: DeepPartial<MODEL> }): Promise<MODEL>;

  /**
   * Find a record by the given filter and delete it
   * @param filter
   * @returns The deleted record
   */
  findOneAndDelete(options: { filter: Partial<MODEL> }): Promise<void>;

  /**
   * Find a record by the given filter and update it
   * @param filter
   * @param updateData
   * @returns The updated success message
   */
  findOneAndUpdate(options: { filter: Partial<MODEL>; updateData: Partial<MODEL> }): Promise<void>;

  /**
   * Find all records
   */
  findAll(): Promise<MODEL[]>;

  /**
   * Find all records by the given filter
   * @param filter
   * @returns The records with given filter
   */
  findMany(options: {
    filter?: Partial<MODEL>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
  }): Promise<MODEL[]>;

  /**
   * Find a record by the given filter
   * @param filter
   * @returns The record with given filter
   */
  findOne(options: { filter: Partial<MODEL>; relations?: string[] }): Promise<MODEL | null>;

  /**
   * Find all with paging and order
   * @param requestPageable
   * @param order
   * @returns MODEL[]
   */
  findAllWithPagingAndOrder(options: { paging: PagingDto; order: RecordOrderType }): Promise<PagingResponseDto<MODEL>>;

  /**
   * Find all with paging
   * @param requestPageable
   * @returns MODEL[]
   */
  findAllWithPaging(options: { paging: PagingDto }): Promise<PagingResponseDto<MODEL>>;

  /**
   * Count records by the given filter
   * @param filter
   * @returns The number of records with given filter
   */
  count(options: { filter?: Partial<MODEL> }): Promise<number>;

  /**
   * Check if a record exists with the given filter
   * @param filter
   */
  exists(options: { filter: Partial<MODEL> }): Promise<boolean>;
}
