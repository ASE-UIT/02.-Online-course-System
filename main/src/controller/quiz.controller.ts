import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Quiz } from '@/models/quiz.model';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Lesson } from '@/models/lesson.model';

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
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
