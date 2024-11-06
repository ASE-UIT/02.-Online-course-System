import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { IStudentCompleteQuizService } from '@/service/interface/i.student_complete_quiz.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentCompleteQuizController {
  public common: IBaseCrudController<StudentCompleteQuiz>;
  private studentCompleteQuizService: IStudentCompleteQuizService<StudentCompleteQuiz>;
  constructor(
    @inject('StudentCompleteQuizService') studentCompleteQuizService: IStudentCompleteQuizService<StudentCompleteQuiz>,
    @inject(ITYPES.Controller) common: IBaseCrudController<StudentCompleteQuiz>
  ) {
    this.studentCompleteQuizService = studentCompleteQuizService;
    this.common = common;
  }
}
