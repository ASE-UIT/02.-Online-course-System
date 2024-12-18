import { PagingDto } from '@/dto/paging.dto';
import { SearchDataDto } from '@/dto/search-data.dto';
import { SearchOperator } from '@/enums/search-operator.enum';
import { RecordOrderType } from '@/types/record-order.types';
import { Between, FindOptionsOrder, FindOptionsWhere, Like } from 'typeorm';

export class SearchUtil {
  static getWhereCondition(searchData: SearchDataDto): {
    where: FindOptionsWhere<any>;
    order: RecordOrderType[];
    paging: PagingDto;
  } {
    const whereConditions: FindOptionsWhere<any> = {};

    const { filters, sorts, rpp, page } = searchData;

    filters.forEach((filter) => {
      const key = filter.key as any;
      if (filter.operator === SearchOperator.equal) {
        whereConditions[key] = filter.value as any;
      } else if (filter.operator === SearchOperator.range) {
        const [min, max] = filter.value.split('-').map(Number);
        whereConditions[key] = Between(min, max) as any;
      } else if (filter.operator === SearchOperator.like) {
        whereConditions[key] = Like(`%${filter.value}%`) as any;
      }
    });

    // Build order
    const order = new Array<RecordOrderType>();

    sorts.forEach((sortItem) => {
      const key = sortItem.key as any;
      order.push({
        column: key,
        direction: sortItem.type
      });
    });

    const paging = new PagingDto(page, rpp);

    return { where: whereConditions, order, paging };
  }
}
