import { QuizController } from '@/controller/quiz.controller';
import { QuizService } from '@/service/quiz.service';
import { Quiz } from '@/models/quiz.model';
import { QuizRepository } from '@/repository/quiz.repository';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { BaseContainer } from '@/container/base.container';

class QuizContainer extends BaseContainer {
  constructor() {
    super(Quiz);
    this.container.bind<IQuizService<Quiz>>('QuizService').to(QuizService);
    this.container.bind<IQuizRepository<Quiz>>('QuizRepository').to(QuizRepository);
    this.container.bind<QuizController>(QuizController).toSelf();
  }

  export() {
    const quizController = this.container.get<QuizController>(QuizController);
    const quizService = this.container.get<IQuizService<any>>('QuizService');
    return { quizController, quizService };
  }
}

const quizContainer = new QuizContainer();
const { quizController, quizService } = quizContainer.export();
export { quizController, quizService };
