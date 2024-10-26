import { Course } from '@/models/course.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import { IBaseRepository } from './interface/i.base.repository';
import { DataSource, IsNull, Not } from 'typeorm';

export class CourseRepository extends BaseRepository<Course> implements ICourseRepository<Course> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Course));
  }
 
}
