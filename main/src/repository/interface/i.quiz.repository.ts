import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IQuizRepository<T> extends IBaseRepository<T> {
  // findByLessonId(lessonId: string): Promise<T[]>;
}
