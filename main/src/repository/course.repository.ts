import { CourseSearchFilterReq } from '@/dto/course/course-search-filter.req';
import { CourseSearchSortReq } from '@/dto/course/course-search-sort.req';
import { Course } from '@/models/course.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import { IBaseRepository } from './interface/i.base.repository';
import { Between, DataSource, FindOptionsOrder, FindOptionsWhere, Like } from 'typeorm';
import { SearchOperator } from '@/enums/search-operator.enum';

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

  async search(
    filters: CourseSearchFilterReq[],
    sort: CourseSearchSortReq,
    rpp: number,
    page: number
  ): Promise<Course[]> {
    const whereConditions: FindOptionsWhere<Course> = {};

    // Build where conditions
    filters.forEach((filter) => {
      const key = filter.key as unknown as keyof Course;
      if (filter.operator === SearchOperator.equal) {
        whereConditions[key] = filter.value as any;
      } else if (filter.operator === SearchOperator.range) {
        const [min, max] = filter.value.split('-').map(Number);
        whereConditions[key] = Between(min, max) as any;
      } else if (filter.operator === SearchOperator.like) {
        whereConditions[key] = Like(`%${filter.value}%`) as any;
      }
    });

    // Build order
    const order: FindOptionsOrder<Course> = {
      [sort.key]: sort.type
    };

    // Calculate pagination parameters
    const skip = (page - 1) * rpp;
    const take = rpp;

    // Execute query
    return await this.ormRepository.find({
      where: whereConditions,
      order,
      skip,
      take
    });
  }
}
