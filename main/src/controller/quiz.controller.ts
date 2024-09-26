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
}
