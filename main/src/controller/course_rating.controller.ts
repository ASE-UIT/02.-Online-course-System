import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CourseRatingSortReq } from '@/dto/course_rating/course_rating-sort.req';
import { CreateCourseRatingReq } from '@/dto/course_rating/create-course_rating.req';
import { UpdateCourseRatingReq } from '@/dto/course_rating/update-course_rating.req';
import { UpdateCourseRatingRes } from '@/dto/course_rating/update-course_rating.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { CourseRating } from '@/models/course_rating.model';
import { ICourseRatingService } from '@/service/interface/i.course_rating.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { validateRequest } from '@/utils/validate/validate-request.util';
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
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: CreateCourseRatingReq = req.body;

      const result = await this.courseRatingService.create({
        data: requestBody
      });
      const responseBody = convertToDto(CreateCourseRatingReq, result);
      res.send_created('Create new rating successful', responseBody);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params.id) throw new BaseError(ErrorCode.NF_01, 'Id là bắt buộc');

      await validateRequest(UpdateCourseRatingReq, req.body);
      const result = await this.courseRatingService.update(req.params.id, req.body);
      const responseBody = new UpdateCourseRatingRes(result);
      res.send_ok('Update rating successful', responseBody);
    } catch (error) {
      next(error);
    }
  }
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sort: CourseRatingSortReq = JSON.parse(req.query.sort as string);
      const rpp = parseInt(req.query.rpp as string) || 10;
      const page = parseInt(req.query.page as string) || 1;

      const result = await this.courseRatingService.search(sort, rpp, page);

      res.send_ok(`Get search rating successfully`, result);
    } catch (error) {
      next(error);
    }
  }

  async getStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courseId = req.params.courseId; // Lấy courseId từ tham số URL
      if (!courseId) {
        throw new BaseError(ErrorCode.NOT_FOUND, 'Course ID is required');
      }

      const statistics = await this.courseRatingService.getRatingStatistics(courseId);
      res.send_ok('Get rating statistics successfully', statistics);
    } catch (error) {
      next(error);
    }
  }
}
