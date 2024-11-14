import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IQuizService<T extends BaseModelType> extends IBaseCrudService<T> {
  findByLessonId(lessonId: string): any;
}
