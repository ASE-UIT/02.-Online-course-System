import { CourseRecommendation } from '@/models/course_recommendation.model';
import { ICourseRecommendationRepository } from '@/repository/interface/i.course_recommendation.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICourseRecommendationService } from '@/service/interface/i.course_recommendation.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseRecommendationService
  extends BaseCrudService<CourseRecommendation>
  implements ICourseRecommendationService<CourseRecommendation>
{
  private courseRecommendationRepository: ICourseRecommendationRepository<CourseRecommendation>;

  constructor(
    @inject('CourseRecommendationRepository')
    courseRecommendationRepository: ICourseRecommendationRepository<CourseRecommendation>
  ) {
    super(courseRecommendationRepository);
    this.courseRecommendationRepository = courseRecommendationRepository;
  }
}
