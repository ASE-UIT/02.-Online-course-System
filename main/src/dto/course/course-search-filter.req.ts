import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import { SearchOperator } from '@/enums/search-operator.enum';
import { Expose } from 'class-transformer';

export class CourseSearchFilterReq {
  operator: SearchOperator;
  key: DifficultyLevel;
  value: string;

  constructor(filter: any) {
    this.operator = filter.operator;
    this.key = filter.key;
    this.value = filter.value;
  }
}
