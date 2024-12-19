import { CourseRecommendation } from '@/models/course_recommendation.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseRecommendationRepository } from '@/repository/interface/i.course_recommendation.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class CourseRecommendationRepository
  extends BaseRepository<CourseRecommendation>
  implements ICourseRecommendationRepository<CourseRecommendation>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(CourseRecommendation));
  }
}
