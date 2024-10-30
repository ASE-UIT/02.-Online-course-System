import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { Course } from '@/models/course.model';
import { CourseSearchFilterReq } from '@/dto/course/course-search-filter.req';
import { CourseSearchSortReq } from '@/dto/course/course-search-sort.req';

export interface ICourseService<T extends BaseModelType> extends IBaseCrudService<T> {
  getClosetLiveCourse(amount: number): Promise<Course[]>;
  search(filters: CourseSearchFilterReq[], sort: CourseSearchSortReq, rpp: number, page: number): Promise<Course[]>;
}
