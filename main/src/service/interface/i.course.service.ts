import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { UpdateCourseRequest } from '@/dto/course/update-course-req';
import { UpdateCourseResponse } from '@/dto/course/update-course.res';

export interface ICourseService<T extends BaseModelType> extends IBaseCrudService<T> {
    update(id: string, data: UpdateCourseRequest): Promise<UpdateCourseResponse>;
}
