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
        relations: ['course', 'course.lecturer'],
        select: {
          studentId: true,
          courseId: true,
          enrolledDate: true,
          status: true,
          completionPercentage: true,
          completionDate: true,
          course: {
            name: true,
            nameEn: true,
            shortDescription: true,
            thumbnail: true,
            lecturer: {
              name: true
            }
          }
        }
      });
      res.send_ok('Get enrollments success', enrollments);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/enrollments/completed
   */
  async getCompletedEnrollment(req: Request, res: Response, next: NextFunction) {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);
      const enrollments = await this.enrollmentService.findMany({
        filter: { studentId: student.id, status: 'completed' },
        relations: ['course', 'course.lecturer'],
        select: {
          studentId: true,
          courseId: true,
          enrolledDate: true,
          status: true,
          completionPercentage: true,
          completionDate: true,
          course: {
            name: true,
            nameEn: true,
            shortDescription: true,
            thumbnail: true,
            lecturer: {
              name: true
            }
          }
        }
      });
      res.send_ok('Get completed enrollments success', enrollments);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/enrollments/in-progress
   */
  async getInProgressEnrollment(req: Request, res: Response, next: NextFunction) {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);
      const enrollments = await this.enrollmentService.getInProgressEnrollment(student.id);
      res.send_ok('Get completed enrollments success', enrollments);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/enrollments/certificate/:courseId
   */
  async getCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const student = SessionUtil.getStudentCurrentlyLoggedIn(req);
      const { courseId } = req.params;
      const certificate = await this.enrollmentService.getCertificate(student.id, courseId);
      res.send_ok('Get certificate success', {
        certificate: certificate
      });
    } catch (error) {
      next(error);
    }
  }
}
