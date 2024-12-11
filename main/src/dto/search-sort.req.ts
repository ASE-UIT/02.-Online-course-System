import { SortType } from '@/enums/sort-type.enum';

export class SearchSortReq {
  key: string;
  type: SortType;

  constructor(sort: any) {
    this.key = sort.key;
    this.type = sort.type;
  }
}
