import { CourseRecommendationController } from '@/controller/course_recommendation.controller';
import { CourseRecommendationService } from '@/service/course_recommendation.service';
import { CourseRecommendation } from '@/models/course_recommendation.model';
import { CourseRecommendationRepository } from '@/repository/course_recommendation.repository';
import { ICourseRecommendationService } from '@/service/interface/i.course_recommendation.service';
import { ICourseRecommendationRepository } from '@/repository/interface/i.course_recommendation.repository';
import { BaseContainer } from '@/container/base.container';
import { ICourseService } from '@/service/interface/i.course.service';
import { courseRepository, courseService } from '@/container/course.container';
import { ICourseRepository } from '@/repository/interface/i.course.repository';

class CourseRecommendationContainer extends BaseContainer {
  constructor() {
    super(CourseRecommendation);
    this.container
      .bind<ICourseRecommendationService<CourseRecommendation>>('CourseRecommendationService')
      .to(CourseRecommendationService);
    this.container
      .bind<ICourseRecommendationRepository<CourseRecommendation>>('CourseRecommendationRepository')
      .to(CourseRecommendationRepository);
    this.container.bind<CourseRecommendationController>(CourseRecommendationController).toSelf();

    //Import
    this.container.bind<ICourseRepository<any>>('CourseRepository').toConstantValue(courseRepository);
  }

  export() {
    const courseRecommendationController =
      this.container.get<CourseRecommendationController>(CourseRecommendationController);
    const courseRecommendationService =
      this.container.get<ICourseRecommendationService<any>>('CourseRecommendationService');
    return { courseRecommendationController, courseRecommendationService };
  }
}

const courseRecommendationContainer = new CourseRecommendationContainer();
const { courseRecommendationController, courseRecommendationService } = courseRecommendationContainer.export();
export { courseRecommendationController, courseRecommendationService };
