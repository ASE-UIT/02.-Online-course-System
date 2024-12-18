import { CourseRatingSortReq } from '@/dto/course_rating/course_rating-sort.req';
import { CreateCourseRatingReq } from '@/dto/course_rating/create-course_rating.req';
import { UpdateCourseRatingReq } from '@/dto/course_rating/update-course_rating.req';
import { UpdateCourseRatingRes } from '@/dto/course_rating/update-course_rating.res';
import { CourseRating } from '@/models/course_rating.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ICourseRatingService<T extends BaseModelType> extends IBaseCrudService<T> {
  updateRating(ratingId: string, arg1: UpdateCourseRatingReq, studentId: string): Promise<void>;
  createRating(requestBody: CreateCourseRatingReq, studentId: string): Promise<void>;
  update(id: string, data: UpdateCourseRatingReq): Promise<UpdateCourseRatingRes>;
  search(sort: CourseRatingSortReq, rpp: number, page: number, courseId?: string): Promise<CourseRating[]>;
  getRatingStatistics(courseId: string): Promise<any>;
}
