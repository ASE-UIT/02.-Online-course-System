import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Course } from '@/models/course.model';
import { ICourseService } from '@/service/interface/i.course.service';
import { ITYPES } from '@/types/interface.types';
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
}
