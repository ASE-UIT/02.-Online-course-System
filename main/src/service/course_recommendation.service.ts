import { CourseSelectRes } from '@/dto/course/course-select.res';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { RoleEnum } from '@/enums/role.enum';
import { Course } from '@/models/course.model';
import { CourseRecommendation } from '@/models/course_recommendation.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
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
  private courseRepository: ICourseRepository<Course>;

  constructor(
    @inject('CourseRecommendationRepository')
    courseRecommendationRepository: ICourseRecommendationRepository<CourseRecommendation>,
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>
  ) {
    super(courseRecommendationRepository);
    this.courseRecommendationRepository = courseRecommendationRepository;
    this.courseRepository = courseRepository;
  }

  private async getTopRatingCourses(topN: number): Promise<Course[]> {
    const courses = await this.courseRepository.findMany({
      order: [{ column: 'averageRating', direction: 'DESC' }],
      paging: {
        page: 1,
        rpp: topN
      },
      relations: ['category', 'lecturer'],
      select: CourseSelectRes,
      filter: {
        isApproved: true
      }
    });
    return courses;
  }

  async getRecommend(user: JwtClaimDto | undefined, topN: number): Promise<Course[]> {
    if (!user) {
      return await this.getTopRatingCourses(topN);
    }

    if (user.roleId === RoleEnum.STUDENT) {
      const studentId = user.id;
      const result = await this.courseRecommendationRepository.findOne({
        filter: {
          studentId: studentId
        }
      });

      if (!result) {
        return await this.getTopRatingCourses(topN);
      }

      const courseIds = result.courses;

      if (!courseIds || courseIds.length === 0) {
        return await this.getTopRatingCourses(topN);
      }

      console.log('courseIds', courseIds);

      const courses = [];

      let count = 0;
      for (const courseId of courseIds) {
        if (count >= topN) {
          break;
        }
        const course = await this.courseRepository.findOne({
          filter: {
            id: courseId,
            isApproved: true
          },
          relations: ['category', 'lecturer'],
          select: CourseSelectRes
        });

        if (!course) {
          continue;
        }

        count++;

        courses.push(course);
      }

      return courses;
    } else {
      return await this.getTopRatingCourses(topN);
    }
  }
}
