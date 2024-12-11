import { SearchDataDto } from '@/dto/search-data.dto';
import { SearchFilterReq } from '@/dto/search-filter.req';
import { SearchSortReq } from '@/dto/search-sort.req';
import { Request } from 'express';

export function getSearchData(req: Request): SearchDataDto {
  const filters: SearchFilterReq[] = req.query.filter ? JSON.parse(req.query.filter as string) : [];
  const sorts: SearchSortReq[] = req.query.sort ? JSON.parse(req.query.sort as string) : [];
  const rpp = parseInt(req.query.rpp as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  return { filters, sorts, rpp, page };
}
