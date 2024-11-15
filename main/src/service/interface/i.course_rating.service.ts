import { CourseRatingSortReq } from '@/dto/course_rating/course_rating-sort.req';
import { UpdateCourseRatingReq } from '@/dto/course_rating/update-course_rating.req';
import { UpdateCourseRatingRes } from '@/dto/course_rating/update-course_rating.res';
import { CourseRating } from '@/models/course_rating.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ICourseRatingService<T extends BaseModelType> extends IBaseCrudService<T> {
  update(id: string, data: UpdateCourseRatingReq): Promise<UpdateCourseRatingRes>;
  search(sort: CourseRatingSortReq, rpp: number, page: number): Promise<CourseRating[]>;
}
