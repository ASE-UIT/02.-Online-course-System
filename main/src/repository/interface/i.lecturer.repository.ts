import { LecturerStatsDto } from '@/dto/lecturer/lecturer-stats.dto';
import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface ILecturerRepository<T> extends IBaseRepository<T> {
  countTotalCourse(lecturerId: string): Promise<number>;
  getLecturerStats(lecturerId: string): Promise<LecturerStatsDto>;
}
