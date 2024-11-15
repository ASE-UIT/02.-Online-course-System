import { StudentCompleteQuizController } from '@/controller/student_complete_quiz.controller';
import { StudentCompleteQuizService } from '@/service/student_complete_quiz.service';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { StudentCompleteQuizRepository } from '@/repository/student_complete_quiz.repository';
import { IStudentCompleteQuizService } from '@/service/interface/i.student_complete_quiz.service';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { BaseContainer } from '@/container/base.container';

class StudentCompleteQuizContainer extends BaseContainer {
  constructor() {
    super(StudentCompleteQuiz);
    this.container
      .bind<IStudentCompleteQuizService<StudentCompleteQuiz>>('StudentCompleteQuizService')
      .to(StudentCompleteQuizService);
    this.container
      .bind<IStudentCompleteQuizRepository<StudentCompleteQuiz>>('StudentCompleteQuizRepository')
      .to(StudentCompleteQuizRepository);
    this.container.bind<StudentCompleteQuizController>(StudentCompleteQuizController).toSelf();
  }

  export() {
    const studentCompleteQuizController =
      this.container.get<StudentCompleteQuizController>(StudentCompleteQuizController);
    const studentCompleteQuizService =
      this.container.get<IStudentCompleteQuizService<any>>('StudentCompleteQuizService');
    const studentCompleteQuizRepository = this.container.get<IStudentCompleteQuizRepository<any>>(
      'StudentCompleteQuizRepository'
    );
    return { studentCompleteQuizController, studentCompleteQuizService, studentCompleteQuizRepository };
  }
}

const studentCompleteQuizContainer = new StudentCompleteQuizContainer();
const { studentCompleteQuizController, studentCompleteQuizService, studentCompleteQuizRepository } =
  studentCompleteQuizContainer.export();
export { studentCompleteQuizController, studentCompleteQuizService, studentCompleteQuizRepository };
