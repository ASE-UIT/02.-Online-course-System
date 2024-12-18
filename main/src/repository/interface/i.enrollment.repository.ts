import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IEnrollmentRepository<T> extends IBaseRepository<T> {
  findInProgress(studentId: string): Promise<T[]>;
}
