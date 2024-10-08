import { Course } from '@/models/course.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import { DataSource, IsNull, Not } from 'typeorm';

export class CourseRepository extends BaseRepository<Course> implements ICourseRepository<Course> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Course));
  }
  async findAll(): Promise<Course[]> {
    return await this.ormRepository.find({
      where: {
        deleteAt: Not(IsNull())
      }
    });
  }
}
