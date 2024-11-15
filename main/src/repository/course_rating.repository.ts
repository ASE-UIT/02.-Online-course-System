import { CourseRatingSortReq } from '@/dto/course_rating/course_rating-sort.req';
import { CourseRating } from '@/models/course_rating.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource, FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export class CourseRatingRepository
  extends BaseRepository<CourseRating>
  implements ICourseRatingRepository<CourseRating>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(CourseRating));
  }
  async search(
    sort: CourseRatingSortReq,
    rpp: number,
    page: number
  ): Promise<CourseRating[]> {

    // Build order
    const order: FindOptionsOrder<CourseRating> = {
      [sort.key]: sort.type
    };

    // Calculate pagination parameters
    const skip = (page - 1) * rpp;
    const take = rpp;

    // Execute query
    return await this.ormRepository.find({
      order,
      skip,
      take
    });
  }
}
