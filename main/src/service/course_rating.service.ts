import { CourseRating } from '@/models/course_rating.model';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICourseRatingService } from '@/service/interface/i.course_rating.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseRatingService extends BaseCrudService<CourseRating> implements ICourseRatingService<CourseRating> {
  private courseRatingRepository: ICourseRatingRepository<CourseRating>;

  constructor(@inject('CourseRatingRepository') courseRatingRepository: ICourseRatingRepository<CourseRating>) {
    super(courseRatingRepository);
    this.courseRatingRepository = courseRatingRepository;
  }
}
