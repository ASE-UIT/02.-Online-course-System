import { Course } from '@/models/course.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import { DataSource } from 'typeorm';

export class CourseRepository extends BaseRepository<Course> implements ICourseRepository<Course> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Course));
  }

  async findClosetLiveCourse(amount: number): Promise<Course[]> {
    return await this.ormRepository
      .createQueryBuilder('courses')
      .where('courses.start_date IS NOT NULL')
      .orWhere('courses.end_date IS NOT NULL')
      .orderBy('ABS(EXTRACT(EPOCH FROM (courses.start_date::timestamp - :now::timestamp)))', 'ASC') // Cast to timestamp
      .setParameter('now', new Date())
      .limit(amount)
      .getMany();
  }
}
