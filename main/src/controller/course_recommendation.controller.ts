import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { RoleEnum } from '@/enums/role.enum';
import { Course } from '@/models/course.model';
import { CourseRecommendation } from '@/models/course_recommendation.model';
import { ICourseService } from '@/service/interface/i.course.service';
import { ICourseRecommendationService } from '@/service/interface/i.course_recommendation.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseRecommendationController {
  public common: IBaseCrudController<CourseRecommendation>;
  private courseRecommendationService: ICourseRecommendationService<CourseRecommendation>;
  private courseService: ICourseService<Course>;
  constructor(
    @inject('CourseRecommendationService')
    courseRecommendationService: ICourseRecommendationService<CourseRecommendation>,
    @inject(ITYPES.Controller) common: IBaseCrudController<CourseRecommendation>,
    @inject('CourseService') courseService: ICourseService<Course>
  ) {
    this.courseRecommendationService = courseRecommendationService;
    this.courseService = courseService;
    this.common = common;
  }

  /**
   * * GET /api/course-recommendation
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const rpp = req.query.rpp ? parseInt(req.query.rpp as string) : 10;

      if (user!.roleId == RoleEnum.STUDENT) {
        const studentId = user!.id;
        const result = await this.courseRecommendationService.findOne({
          filter: {
            studentId: studentId
          }
        });
        res.send_ok('Get all course recommendation successful', result);
      } else {
        const result = await this.courseRecommendationService.findMany({
          order: [{ column: 'averageRating', direction: 'DESC' }],
          paging: {
            page: page,
            rpp: rpp
          }
        });
        res.send_ok('Get all course recommendation successful', result);
      }
    } catch (error) {
      next(error);
    }
  }
}
