import { StudentCompleteLessonController } from '@/controller/student_complete_lesson.controller';
import { StudentCompleteLessonService } from '@/service/student_complete_lesson.service';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { StudentCompleteLessonRepository } from '@/repository/student_complete_lesson.repository';
import { IStudentCompleteLessonService } from '@/service/interface/i.student_complete_lesson.service';
import { IStudentCompleteLessonRepository } from '@/repository/interface/i.student_complete_lesson.repository';
import { BaseContainer } from '@/container/base.container';

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
