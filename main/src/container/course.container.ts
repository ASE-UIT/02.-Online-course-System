import { BaseContainer } from '@/container/base.container';
import { lecturerRepository } from '@/container/lecturer.container';
import { CourseController } from '@/controller/course.controller';
import { Course } from '@/models/course.model';
import { CourseRepository } from '@/repository/course.repository';
import { CourseCategoryRepository } from '@/repository/course_category.repository';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ICourseCategoryRepository } from '@/repository/interface/i.course_category';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { CourseService } from '@/service/course.service';
import { ICourseService } from '@/service/interface/i.course.service';
import { log } from 'console';

class CourseContainer extends BaseContainer {
  constructor() {
    super(Course);
    this.container.bind<ICourseService<Course>>('CourseService').to(CourseService);
    this.container.bind<ICourseRepository<Course>>('CourseRepository').to(CourseRepository);
    this.container.bind<CourseController>(CourseController).toSelf();

    //Import
    this.container.bind<ICourseCategoryRepository<any>>('CourseCategoryRepository').to(CourseCategoryRepository);
    this.container.bind<ILecturerRepository<any>>('LecturerRepository').toConstantValue(lecturerRepository);
  }
  export() {
    const courseController = this.container.get<CourseController>(CourseController);
    const courseService = this.container.get<ICourseService<any>>('CourseService');
    const courseRepository = this.container.get<ICourseRepository<any>>('CourseRepository');
    return { courseController, courseService, courseRepository };
  }
}

const courseContainer = new CourseContainer();
const { courseController, courseService, courseRepository } = courseContainer.export();
export { courseController, courseService, courseRepository };
