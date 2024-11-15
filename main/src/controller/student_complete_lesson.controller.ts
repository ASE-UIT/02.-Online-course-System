import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { IStudentCompleteLessonService } from '@/service/interface/i.student_complete_lesson.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentCompleteLessonController {
  public common: IBaseCrudController<StudentCompleteLesson>;
  private studentCompleteLessonService: IStudentCompleteLessonService<StudentCompleteLesson>;
  constructor(
    @inject('StudentCompleteLessonService')
    studentCompleteLessonService: IStudentCompleteLessonService<StudentCompleteLesson>,
    @inject(ITYPES.Controller) common: IBaseCrudController<StudentCompleteLesson>
  ) {
    this.studentCompleteLessonService = studentCompleteLessonService;
    this.common = common;
  }
}
