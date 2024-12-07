import { BaseContainer } from '@/container/base.container';
import { lecturerRepository } from '@/container/lecturer.container';
import { studentCompleteLessonService } from '@/container/student_complete_lesson.container';
import { studentCompleteQuizRepository } from '@/container/student_complete_quiz.container';
import { CourseController } from '@/controller/course.controller';
import { Course } from '@/models/course.model';
import { CourseRepository } from '@/repository/course.repository';
import { CourseCategoryRepository } from '@/repository/course_category.repository';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ICourseCategoryRepository } from '@/repository/interface/i.course_category';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { CourseService } from '@/service/course.service';
import { ICourseService } from '@/service/interface/i.course.service';
import { IStudentCompleteLessonService } from '@/service/interface/i.student_complete_lesson.service';
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
    this.container
      .bind<IStudentCompleteLessonService<any>>('StudentCompleteLessonService')
      .toConstantValue(studentCompleteLessonService);
    this.container
      .bind<IStudentCompleteQuizRepository<any>>('StudentCompleteQuizRepository')
      .toConstantValue(studentCompleteQuizRepository);
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
