import { CourseRatingSortReq } from '@/dto/course_rating/course_rating-sort.req';
import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface ICourseRatingRepository<T> extends IBaseRepository<T> {
  search(sort: CourseRatingSortReq, rpp: number, page: number, courseId?: string): Promise<T[]>;
}
