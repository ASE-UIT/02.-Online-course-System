import { IBaseRepository } from '@/repository/interface/i.base.repository';
import { CourseSearchFilterReq } from '@/dto/course/course-search-filter.req';
import { CourseSearchSortReq } from '@/dto/course/course-search-sort.req';

export interface ICourseRepository<T> extends IBaseRepository<T> {
  findClosetLiveCourse(amount: number): Promise<T[]>;
  search(filters: CourseSearchFilterReq[], sort: CourseSearchSortReq, rpp: number, page: number): Promise<T[]>;
}
