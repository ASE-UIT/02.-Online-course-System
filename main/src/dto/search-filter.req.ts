import { SearchOperator } from '@/enums/search-operator.enum';

export class SearchFilterReq {
  operator: SearchOperator;
  key: any;
  value: string;

  constructor(filter: any) {
    this.operator = filter.operator;
    this.key = filter.key;
    this.value = filter.value;
  }
}
