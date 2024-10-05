import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Course } from '@/models/course.model';
import { ICourseService } from '@/service/interface/i.course.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

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

  /**
   * * PUT /course/:id
   */
  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = req.params.id;
      const result = await this.courseService.findOneAndUpdate({
        filter: { id: courseId },
        updateData: {
          deleteAt: new Date()
        }
      });
      res.send_ok('Xoá mềm khoá học thành công', result);
    } catch (error) {
      next(error);
    }
  }
}
