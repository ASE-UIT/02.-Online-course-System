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
}
