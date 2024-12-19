import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IStudentCompleteQuizRepository<T> extends IBaseRepository<T> {
  countCompletedByCourseIdAndStudentId(courseId: string, studentId: string): Promise<number>;
  findQuizDoneByCourse(studentId: string, courseId: string): Promise<T[]>;
}
