import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { LessonPart } from '@/models/lesson_part.model';
import { ILessonPartService } from '@/service/interface/i.lesson_part.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LessonPartController {
  public common: IBaseCrudController<LessonPart>;
  private lessonPartService: ILessonPartService<LessonPart>;
  constructor(
    @inject('LessonPartService') lessonPartService: ILessonPartService<LessonPart>,
    @inject(ITYPES.Controller) common: IBaseCrudController<LessonPart>
  ) {
    this.lessonPartService = lessonPartService;
    this.common = common;
  }
}
