import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { Course } from '@/models/course.model';
import { CourseCategory } from '@/models/course_category.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ICourseCategoryRepository } from '@/repository/interface/i.course_category';
import { BaseCrudService } from '@/service/base/base.service';
import { ICourseService } from '@/service/interface/i.course.service';
import { inject, injectable } from 'inversify';
import { IsNull, Not } from 'typeorm';

@injectable()
export class CourseService extends BaseCrudService<Course> implements ICourseService<Course> {
  private courseRepository: ICourseRepository<Course>;
  private courseCategoryRepository: ICourseCategoryRepository<CourseCategory>;

  constructor(
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>,
    @inject('CourseCategoryRepository') courseCategoryRepository: ICourseCategoryRepository<CourseCategory>
  ) {
    super(courseRepository);
    this.courseRepository = courseRepository;
    this.courseCategoryRepository = courseCategoryRepository;
  }

  async getClosetLiveCourse(amount: number): Promise<Course[]> {
    if (amount < 0) throw new Error('Courses amount should be positive');

    return this.courseRepository.findClosetLiveCourse(amount);
  }
}
