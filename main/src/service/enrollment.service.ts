import { Enrollment } from '@/models/enrollment.model';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IEnrollmentService } from '@/service/interface/i.enrollment.service';
import { inject, injectable } from 'inversify';
import { enrollmentRepository } from '@/container/enrollment.container';
import BaseError from '@/utils/error/base.error';
import { PrintServiceUtil } from '@/utils/print-service/print-service.util';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { Student } from '@/models/student.model';

@injectable()
export class EnrollmentService extends BaseCrudService<Enrollment> implements IEnrollmentService<Enrollment> {
  private enrollmentRepository: IEnrollmentRepository<Enrollment>;

  constructor(@inject('EnrollmentRepository') enrollmentRepository: IEnrollmentRepository<Enrollment>) {
    super(enrollmentRepository);
    this.enrollmentRepository = enrollmentRepository;
  }

  async getCertificate(id: string, courseId: string): Promise<any> {
    //Check if the student has completed the course
    const enrollment = await this.enrollmentRepository.findOne({
      filter: { studentId: id, courseId: courseId, status: 'completed' },
      relations: ['student', 'course', 'course.lecturer']
    });

    if (!enrollment) {
      throw new BaseError('NOT_COMPLETED_COURSE', 'You have not completed this course');
    }

    //Print the certificate
    return PrintServiceUtil.printCertificate({
      studentName: enrollment.student.name,
      courseName: enrollment.course.name!,
      date: enrollment.completionDate!,
      instructor: enrollment.course.lecturer.name!,
      appFounder: 'Nguyen Trinh Dong'
    });
  }

  getInProgressEnrollment(studentId: string): Promise<Enrollment[]> {
    return enrollmentRepository.findInProgress(studentId);
  }
}
