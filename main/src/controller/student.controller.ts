import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Student } from '@/models/student.model';
import { IStudentService } from '@/service/interface/i.student.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentController {
  public common: IBaseCrudController<Student>;
  private studentService: IStudentService<Student>;
  constructor(
    @inject('StudentService') studentService: IStudentService<Student>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Student>
  ) {
    this.studentService = studentService;
    this.common = common;
  }
}
