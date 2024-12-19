import { QuizController } from '@/controller/quiz.controller';
import { QuizService } from '@/service/quiz.service';
import { Quiz } from '@/models/quiz.model';
import { QuizRepository } from '@/repository/quiz.repository';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { BaseContainer } from '@/container/base.container';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { studentCompleteQuizRepository } from '@/container/student_complete_quiz.container';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { enrollmentRepository } from '@/container/enrollment.container';

class QuizContainer extends BaseContainer {
  constructor() {
    super(Quiz);
    this.container.bind<IQuizService<Quiz>>('QuizService').to(QuizService);
    this.container.bind<IQuizRepository<Quiz>>('QuizRepository').to(QuizRepository);
    this.container.bind<QuizController>(QuizController).toSelf();

    //Import
    this.container
      .bind<IStudentCompleteQuizRepository<any>>('StudentCompleteQuizRepository')
      .toConstantValue(studentCompleteQuizRepository);
    this.container.bind<IEnrollmentRepository<any>>('EnrollmentRepository').toConstantValue(enrollmentRepository);
  }

  export() {
    const quizController = this.container.get<QuizController>(QuizController);
    const quizService = this.container.get<IQuizService<any>>('QuizService');
    const quizRepository = this.container.get<IQuizRepository<any>>('QuizRepository');
    return { quizController, quizService, quizRepository };
  }
}

const quizContainer = new QuizContainer();
const { quizController, quizService, quizRepository } = quizContainer.export();
export { quizController, quizService, quizRepository };
