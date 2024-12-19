import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IQuizRepository<T> extends IBaseRepository<T> {
  countByCourseId(courseId: string): Promise<number>;
  // findByLessonId(lessonId: string): Promise<T[]>;
}
