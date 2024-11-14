import { UpdateCourseRatingReq } from '@/dto/course_rating/update-course_rating.req';
import { UpdateCourseRatingRes } from '@/dto/course_rating/update-course_rating.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ICourseRatingService<T extends BaseModelType> extends IBaseCrudService<T> {
    update(id: string, data: UpdateCourseRatingReq): Promise<UpdateCourseRatingRes>;
}
