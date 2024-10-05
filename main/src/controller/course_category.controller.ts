import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CourseCategory } from '@/models/course_category.model';
import { ICourseCategoryService } from '@/service/interface/i.course_category.service';
import { ITYPES } from '@/types/interface.types';
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
}
