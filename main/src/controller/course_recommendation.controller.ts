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
  constructor(
    @inject('CourseRecommendationService')
    courseRecommendationService: ICourseRecommendationService<CourseRecommendation>,
    @inject(ITYPES.Controller) common: IBaseCrudController<CourseRecommendation>
  ) {
    this.courseRecommendationService = courseRecommendationService;
    this.common = common;
  }

  /**
   * * GET /api/course-recommendation
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;
      const topN = Number(req.query.topN) || 10;

      const result = await this.courseRecommendationService.getRecommend(user, topN);

      res.send_ok('Lấy danh sách khóa học gợi ý thành công', result);
    } catch (error) {
      next(error);
    }
  }
}
