import { CourseRatingController } from '@/controller/course_rating.controller';
import { CourseRatingService } from '@/service/course_rating.service';
import { CourseRating } from '@/models/course_rating.model';
import { CourseRatingRepository } from '@/repository/course_rating.repository';
import { ICourseRatingService } from '@/service/interface/i.course_rating.service';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { BaseContainer } from '@/container/base.container';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { Course } from '@/models/course.model';
import { CourseRepository } from '@/repository/course.repository';
import { StudentRepository } from '@/repository/student.repository';
import { Student } from '@/models/student.model';
import { IStudentRepository } from '@/repository/interface/i.student.repository';

class CourseRatingContainer extends BaseContainer {
  constructor() {
    super(CourseRating);
    this.container.bind<ICourseRatingService<CourseRating>>('CourseRatingService').to(CourseRatingService);
    this.container.bind<ICourseRatingRepository<CourseRating>>('CourseRatingRepository').to(CourseRatingRepository);
    this.container.bind<CourseRatingController>(CourseRatingController).toSelf();
    this.container.bind<ICourseRepository<Course>>('CourseRepository').to(CourseRepository);
    this.container.bind<IStudentRepository<Student>>('StudentRepository').to(StudentRepository);
  }

  export() {
    const courseRatingController = this.container.get<CourseRatingController>(CourseRatingController);
    const courseRatingService = this.container.get<ICourseRatingService<any>>('CourseRatingService');
    return { courseRatingController, courseRatingService };
  }
}

const courseRatingContainer = new CourseRatingContainer();
const { courseRatingController, courseRatingService } = courseRatingContainer.export();
export { courseRatingController, courseRatingService };
