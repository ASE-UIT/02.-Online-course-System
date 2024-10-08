import BaseError from '@/utils/error/base.error';
import { Request, Response, NextFunction } from 'express';
import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Course } from '@/models/course.model';
import { ICourseService } from '@/service/interface/i.course.service';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';
import { CreateCourseRequest } from '@/dto/course/create-course.req';
import { CreateCourseResponse } from '@/dto/course/create-course.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { validateRequest } from '@/utils/validate/validate-request.util';
import { ErrorCode } from '@/enums/error-code.enums';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { UpdateCourseRequest } from '@/dto/course/update-course-req';
import { UpdateCourseResponse } from '@/dto/course/update-course.res';


@injectable()
export class CourseController {
  public common: IBaseCrudController<Course>;
  private courseService: ICourseService<Course>;
  constructor(
    @inject('CourseService') courseService: ICourseService<Course>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Course>
  ) {
    this.courseService = courseService;
    this.common = common;
  }


  
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await validateRequest(CreateCourseRequest, req.body);
      const result = await this.courseService.create({ data: req.body });
      const responseBody = new CreateCourseResponse(result);
      res.send_created('Tạo mới khóa học thành công', responseBody);
    } catch (error) {
      next(error);
    }
  }


  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Kiểm tra id trong request params
      if (!req.params.id) throw new BaseError(ErrorCode.NF_01, 'Id là bắt buộc');

      // Validate request body dựa vào DTO (UpdateCourseReq)
      await validateRequest(UpdateCourseRequest, req.body);
      const result = await this.courseService.update(req.params.id, req.body);
      const responseBody = new UpdateCourseResponse(result);
      res.send_ok('Cập nhật khóa học thành công', responseBody);
    } catch (error) {
      next(error);
    }
  }
}
