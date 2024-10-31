import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CourseCategoryRes } from '@/dto/course_category/course_category.res';
import { CreateCourseCategoryReq } from '@/dto/course_category/create-course_category.req';
import { CourseCategory } from '@/models/course_category.model';
import { ICourseCategoryService } from '@/service/interface/i.course_category.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseCategoryController {
  public common: IBaseCrudController<CourseCategory>;
  private courseCategoryService: ICourseCategoryService<CourseCategory>;
  constructor(
    @inject('CourseCategoryService') courseCategoryService: ICourseCategoryService<CourseCategory>,
    @inject(ITYPES.Controller) common: IBaseCrudController<CourseCategory>
  ) {
    this.courseCategoryService = courseCategoryService;
    this.common = common;
  }
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await this.courseCategoryService.findAll();
      const resultDto = convertToDto(CourseCategoryRes, categories);
      res.send_ok('Get all categories successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: CreateCourseCategoryReq = req.body;

      const result = await this.courseCategoryService.create({
        data: requestBody
      });
      const responseBody = convertToDto(CreateCourseCategoryReq, result);
      res.send_created('Create new category successful', responseBody);
    } catch (error) {
      next(error);
    }
  }
}
