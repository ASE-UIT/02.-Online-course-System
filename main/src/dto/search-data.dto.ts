import { SearchFilterReq } from '@/dto/search-filter.req';
import { SearchSortReq } from '@/dto/search-sort.req';

export class SearchDataDto {
  filters!: SearchFilterReq[];
  sorts!: SearchSortReq[];
  rpp!: number;
  page!: number;
}
