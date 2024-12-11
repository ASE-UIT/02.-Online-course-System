import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Enrollment } from '@/models/enrollment.model';
import { IEnrollmentService } from '@/service/interface/i.enrollment.service';
import { ITYPES } from '@/types/interface.types';
import { SessionUtil } from '@/utils/session.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class EnrollmentController {
  public common: IBaseCrudController<Enrollment>;
  private enrollmentService: IEnrollmentService<Enrollment>;
  constructor(
    @inject('EnrollmentService') enrollmentService: IEnrollmentService<Enrollment>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Enrollment>
  ) {
    this.enrollmentService = enrollmentService;
    this.common = common;
  }

  /**
   * * GET /api/enrollments/me
   */
  async getMyEnrollment(req: Request, res: Response, next: NextFunction) {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);
      const enrollments = await this.enrollmentService.findMany({
        filter: { studentId: student.id },
        relations: ['course']
      });
      res.send_ok('Get enrollments success', enrollments);
    } catch (error) {
      next(error);
    }
  }
}
