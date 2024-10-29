import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { Course } from '@/models/course.model';

export interface ICourseService<T extends BaseModelType> extends IBaseCrudService<T> {
  getClosetLiveCourse(amount: number): Promise<Course[]>;
}
