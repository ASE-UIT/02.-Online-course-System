import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CourseRes } from '@/dto/course/course.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { Course } from '@/models/course.model';
import { ICourseService } from '@/service/interface/i.course.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
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
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courses = await this.courseService.findAll();
      const resultDto = convertToDto(CourseRes, courses);
      res.send_ok('Get all courses successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }
  async findAllWithPaging(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const rpp = parseInt(req.query.rpp as string) || 10;
     
      const paging = new PagingDto(page, rpp);

      const response: PagingResponseDto<Course> = await this.courseService.findAllWithPaging({ paging: paging });
      res.send_ok('Get all courses successfully', response);
    } catch (error) {
      next(error);
    }
}
