import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface ILessonRepository<T> extends IBaseRepository<T> {
  countByCourseId(courseId: string): Promise<number>;
}
