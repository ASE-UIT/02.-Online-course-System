import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IStudentCompleteQuizRepository<T> extends IBaseRepository<T> {
  findQuizDoneByCourse(studentId: string, courseId: string): Promise<T[]>;
}
