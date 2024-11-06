import { CourseRatingController } from '@/controller/course_rating.controller';
import { CourseRatingService } from '@/service/course_rating.service';
import { CourseRating } from '@/models/course_rating.model';
import { CourseRatingRepository } from '@/repository/course_rating.repository';
import { ICourseRatingService } from '@/service/interface/i.course_rating.service';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { BaseContainer } from '@/container/base.container';

class CourseRatingContainer extends BaseContainer {
  constructor() {
    super(CourseRating);
    this.container.bind<ICourseRatingService<CourseRating>>('CourseRatingService').to(CourseRatingService);
    this.container.bind<ICourseRatingRepository<CourseRating>>('CourseRatingRepository').to(CourseRatingRepository);
    this.container.bind<CourseRatingController>(CourseRatingController).toSelf();
  }

  export() {
    const courseRatingController = this.container.get<CourseRatingController>(CourseRatingController);
    const courseRatingService = this.container.get<ICourseRatingService<any>>('CourseRatingService');
    return { courseRatingController, courseRatingService };
  }
}

const courseRatingContainer = new CourseRatingContainer();
const { courseRatingController, courseRatingService } = courseRatingContainer.export();
export { courseRatingController, courseRatingService };
