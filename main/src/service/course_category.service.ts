import { CourseCategory } from '@/models/course_category.model';
import { ICourseCategoryRepository } from '@/repository/interface/i.course_category';
import { BaseCrudService } from '@/service/base/base.service';
import { ICourseCategoryService } from '@/service/interface/i.course_category.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseCategoryService
  extends BaseCrudService<CourseCategory>
  implements ICourseCategoryService<CourseCategory>
{
  private courseCategoryRepository: ICourseCategoryRepository<CourseCategory>;
  constructor(@inject('CourseCategoryRepository') courseCategoryRepository: ICourseCategoryRepository<CourseCategory>) {
    super(courseCategoryRepository);
    this.courseCategoryRepository = courseCategoryRepository;
  }
}
