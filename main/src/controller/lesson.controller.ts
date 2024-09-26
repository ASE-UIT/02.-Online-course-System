import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Lesson } from '@/models/lesson.model';
import { ILessonService } from '@/service/interface/i.lesson.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LessonController {
  public common: IBaseCrudController<Lesson>;
  private lessonService: ILessonService<Lesson>;
  constructor(
    @inject('LessonService') lessonService: ILessonService<Lesson>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Lesson>
  ) {
    this.lessonService = lessonService;
    this.common = common;
  }
}
