import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Quiz } from '@/models/quiz.model';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class QuizController {
  public common: IBaseCrudController<Quiz>;
  private quizService: IQuizService<Quiz>;
  constructor(
    @inject('QuizService') quizService: IQuizService<Quiz>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Quiz>
  ) {
    this.quizService = quizService;
    this.common = common;
  }

  /**
   * * GET /quiz/:lessonId
   */
  async findByLessonId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lessonId = req.params.lessonId;
      const result = await this.quizService.findByLessonId(lessonId);
      res.send_ok('Get quizzes successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /quiz/answer?quizId&studentId&choice
   */
  async answerQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const quizId = req.query.quizId?.toString();
      const studentId = req.query.studentId?.toString();
      const choice = req.query.choice?.toString();

      // Validate quizId, choice
      const quiz = await this.quizService.findOne({ filter: { id: quizId } });
      if (!quiz) {
        res.send_badRequest('Quiz not found');
        return;
      }
      if (choice !== 'A' && choice !== 'B' && choice !== 'C' && choice !== 'D') {
        res.send_badRequest('Invalid choice');
        return;
      }

      const result = await this.quizService.answerQuiz(quizId, studentId, choice);
      if (result) {
        res.send_ok('Right answer', result);
      } else {
        res.send_ok('Wrong answer', result);
      }
    } catch (error) {
      next(error);
    }
  }
}
