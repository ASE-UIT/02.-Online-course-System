import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CourseRating } from '@/models/course_rating.model';
import { ICourseRatingService } from '@/service/interface/i.course_rating.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseRatingController {
  public common: IBaseCrudController<CourseRating>;
  private courseRatingService: ICourseRatingService<CourseRating>;
  constructor(
    @inject('CourseRatingService') courseRatingService: ICourseRatingService<CourseRating>,
    @inject(ITYPES.Controller) common: IBaseCrudController<CourseRating>
  ) {
    this.courseRatingService = courseRatingService;
    this.common = common;
  }
}
