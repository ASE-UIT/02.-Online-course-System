﻿import { SortType } from '@/enums/sort-type.enum';
import { Expose } from 'class-transformer';

export class CourseSearchSortReq {
  key: string;
  type: SortType;

  constructor(sort: any) {
    this.key = sort.key;
    this.type = sort.type;
  }
}
