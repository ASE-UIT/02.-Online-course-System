import { TIME_CONSTANTS } from '@/constants/time.constants';
import { LecturerStatsDto } from '@/dto/lecturer/lecturer-stats.dto';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { Course } from '@/models/course.model';
import { CourseRating } from '@/models/course_rating.model';
import { Enrollment } from '@/models/enrollment.model';
import { Lecturer } from '@/models/lecturer.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { ITYPES } from '@/types/interface.types';
import redis from '@/utils/redis/redis.util';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';

export class LecturerRepository extends BaseRepository<Lecturer> implements ILecturerRepository<Lecturer> {
  private enrollmentRepository: Repository<Enrollment>;
  private courseRatingRepository: Repository<CourseRating>;
  private courseRepository: Repository<Course>;

  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Lecturer));
    this.enrollmentRepository = dataSource.getRepository(Enrollment);
    this.courseRatingRepository = dataSource.getRepository(CourseRating);
    this.courseRepository = dataSource.getRepository(Course);
  }

  async countTotalCourse(lecturerId: string): Promise<number> {
    return await this.courseRepository.count({
      where: {
        lecturerId: lecturerId
      }
    });
  }

  async getLecturerStats(lecturerId: string): Promise<LecturerStatsDto> {
    //Check from cache
    const cacheData = await redis.get(`${RedisSchemaEnum.lecturerStats}:${lecturerId}`);

    if (cacheData) {
      return JSON.parse(cacheData) as LecturerStatsDto;
    }

    const lecturerStats = new LecturerStatsDto();

    const lecturer = await this.ormRepository.findOne({ where: { id: lecturerId }, relations: ['courses'] });

    const totalCourse = (await lecturer!.courses).length;

    const totalStudent = await this.enrollmentRepository.count({
      where: {
        course: {
          lecturerId: lecturerId
        }
      }
    });

    const allCourseRatings = await this.courseRatingRepository.find({
      where: {
        course: {
          lecturerId: lecturerId
        }
      }
    });

    const totalRating = allCourseRatings.length;

    let sumRating = 0;

    for (const courseRating of allCourseRatings) {
      if (courseRating.ratingPoint) {
        sumRating += courseRating.ratingPoint;
      }
    }

    const averageRating = (sumRating / totalRating).toFixed(1);

    lecturerStats.totalCourses = totalCourse;
    lecturerStats.totalStudents = totalStudent;
    lecturerStats.totalRating = totalRating;
    lecturerStats.averageRating = parseFloat(averageRating);

    //Set cache
    await redis.set(
      `${RedisSchemaEnum.lecturerStats}:${lecturerId}`,
      JSON.stringify(lecturerStats),
      'EX',
      TIME_CONSTANTS.DAY / 1000 // 1 day
    );

    return lecturerStats;
  }
}
