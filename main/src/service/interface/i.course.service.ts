import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { UpdateCourseRequest } from '@/dto/course/update-course-req';
import { UpdateCourseResponse } from '@/dto/course/update-course.res';
import { Course } from '@/models/course.model';
import { CreateCourseRequest } from '@/dto/course/create-course.req';

export interface ICourseService<T extends BaseModelType> extends IBaseCrudService<T> {
  lecturerCreateCourse(data: CreateCourseRequest, lecturerId: string): Promise<Course>;
  update(id: string, data: UpdateCourseRequest): Promise<UpdateCourseResponse>;
}
