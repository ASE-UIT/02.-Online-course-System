import { Quiz } from '@/models/quiz.model';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { inject, injectable } from 'inversify';

@injectable()
export class QuizService extends BaseCrudService<Quiz> implements IQuizService<Quiz> {
  private quizRepository: IQuizRepository<Quiz>;

  constructor(@inject('QuizRepository') quizRepository: IQuizRepository<Quiz>) {
    super(quizRepository);
    this.quizRepository = quizRepository;
  }
}
