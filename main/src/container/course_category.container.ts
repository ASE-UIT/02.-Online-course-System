import { BaseContainer } from '@/container/base.container';
import { CourseCategoryController } from '@/controller/course_category.controller';
import { CourseCategory } from '@/models/course_category.model';
import { CourseCategoryRepository } from '@/repository/course_category.repository';
import { ICourseCategoryRepository } from '@/repository/interface/i.course_category';
import { CourseCategoryService } from '@/service/course_category.service';
import { ICourseCategoryService } from '@/service/interface/i.course_category.service';

class CourseCategoryContainer extends BaseContainer {
  constructor() {
    super(CourseCategory);
    this.container.bind<ICourseCategoryService<CourseCategory>>('CourseCategoryService').to(CourseCategoryService);
    this.container
      .bind<ICourseCategoryRepository<CourseCategory>>('CourseCategoryRepository')
      .to(CourseCategoryRepository);
    this.container.bind<CourseCategoryController>(CourseCategoryController).toSelf();
  }

  export() {
    const courseCategoryController = this.container.get<CourseCategoryController>(CourseCategoryController);
    const courseCategoryService = this.container.get<ICourseCategoryService<any>>('CourseCategoryService');
    return { courseCategoryController, courseCategoryService };
  }
}

const courseCategoryContainer = new CourseCategoryContainer();
const { courseCategoryController, courseCategoryService } = courseCategoryContainer.export();
export { courseCategoryController, courseCategoryService };
