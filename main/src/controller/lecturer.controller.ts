import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Lecturer } from '@/models/lecturer.model';
import { ILecturerService } from '@/service/interface/i.lecturer.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LecturerController {
  public common: IBaseCrudController<Lecturer>;
  private lecturerService: ILecturerService<Lecturer>;
  constructor(
    @inject('LecturerService') lecturerService: ILecturerService<Lecturer>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Lecturer>
  ) {
    this.lecturerService = lecturerService;
    this.common = common;
  }
}
