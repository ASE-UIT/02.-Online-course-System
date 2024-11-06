import { CourseRating } from '@/models/course_rating.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class CourseRatingRepository
  extends BaseRepository<CourseRating>
  implements ICourseRatingRepository<CourseRating>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(CourseRating));
  }
}
