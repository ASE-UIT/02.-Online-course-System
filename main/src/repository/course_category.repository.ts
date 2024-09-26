import { CourseCategory } from '@/models/course_category.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseCategoryRepository } from '@/repository/interface/i.course_category';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import { DataSource } from 'typeorm';

export class CourseCategoryRepository
  extends BaseRepository<CourseCategory>
  implements ICourseCategoryRepository<CourseCategory>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(CourseCategory));
  }
}
