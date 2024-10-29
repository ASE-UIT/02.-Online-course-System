import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface ICourseRepository<T> extends IBaseRepository<T> {
  findClosetLiveCourse(amount: number): Promise<T[]>;
}
