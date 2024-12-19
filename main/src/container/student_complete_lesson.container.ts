import { StudentCompleteLessonController } from '@/controller/student_complete_lesson.controller';
import { StudentCompleteLessonService } from '@/service/student_complete_lesson.service';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { StudentCompleteLessonRepository } from '@/repository/student_complete_lesson.repository';
import { IStudentCompleteLessonService } from '@/service/interface/i.student_complete_lesson.service';
import { IStudentCompleteLessonRepository } from '@/repository/interface/i.student_complete_lesson.repository';
import { BaseContainer } from '@/container/base.container';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { courseRepository } from '@/container/course.container';
import { ILessonRepository } from '@/repository/interface/i.lesson.repository';
import { lessonRepository } from '@/container/lesson.container';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { enrollmentRepository } from '@/container/enrollment.container';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { studentCompleteQuizRepository } from '@/container/student_complete_quiz.container';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { quizRepository } from '@/container/quiz.container';

class StudentCompleteLessonContainer extends BaseContainer {
  constructor() {
    super(StudentCompleteLesson);
    this.container
      .bind<IStudentCompleteLessonService<StudentCompleteLesson>>('StudentCompleteLessonService')
      .to(StudentCompleteLessonService);
    this.container
      .bind<IStudentCompleteLessonRepository<StudentCompleteLesson>>('StudentCompleteLessonRepository')
      .to(StudentCompleteLessonRepository);
    this.container.bind<StudentCompleteLessonController>(StudentCompleteLessonController).toSelf();

    //Import
    this.container.bind<ILessonRepository<any>>('LessonRepository').toConstantValue(lessonRepository);
    this.container.bind<IEnrollmentRepository<any>>('EnrollmentRepository').toConstantValue(enrollmentRepository);
    this.container
      .bind<IStudentCompleteQuizRepository<any>>('StudentCompleteQuizRepository')
      .toConstantValue(studentCompleteQuizRepository);
    this.container.bind<IQuizRepository<any>>('QuizRepository').toConstantValue(quizRepository);
  }

  export() {
    const studentCompleteLessonController = this.container.get<StudentCompleteLessonController>(
      StudentCompleteLessonController
    );
    const studentCompleteLessonService =
      this.container.get<IStudentCompleteLessonService<any>>('StudentCompleteLessonService');
    return { studentCompleteLessonController, studentCompleteLessonService };
  }
}

const studentCompleteLessonContainer = new StudentCompleteLessonContainer();
const { studentCompleteLessonController, studentCompleteLessonService } = studentCompleteLessonContainer.export();
export { studentCompleteLessonController, studentCompleteLessonService };
