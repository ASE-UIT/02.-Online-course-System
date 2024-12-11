import { Enrollment } from '@/models/enrollment.model';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IEnrollmentService } from '@/service/interface/i.enrollment.service';
import { inject, injectable } from 'inversify';

@injectable()
export class EnrollmentService extends BaseCrudService<Enrollment> implements IEnrollmentService<Enrollment> {
  private enrollmentRepository: IEnrollmentRepository<Enrollment>;

  constructor(@inject('EnrollmentRepository') enrollmentRepository: IEnrollmentRepository<Enrollment>) {
    super(enrollmentRepository);
    this.enrollmentRepository = enrollmentRepository;
  }
}
