import { EnrollmentController } from '@/controller/enrollment.controller';
import { EnrollmentService } from '@/service/enrollment.service';
import { Enrollment } from '@/models/enrollment.model';
import { EnrollmentRepository } from '@/repository/enrollment.repository';
import { IEnrollmentService } from '@/service/interface/i.enrollment.service';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { BaseContainer } from '@/container/base.container';

class EnrollmentContainer extends BaseContainer {
  constructor() {
    super(Enrollment);
    this.container.bind<IEnrollmentService<Enrollment>>('EnrollmentService').to(EnrollmentService);
    this.container.bind<IEnrollmentRepository<Enrollment>>('EnrollmentRepository').to(EnrollmentRepository);
    this.container.bind<EnrollmentController>(EnrollmentController).toSelf();
  }

  export() {
    const enrollmentController = this.container.get<EnrollmentController>(EnrollmentController);
    const enrollmentService = this.container.get<IEnrollmentService<any>>('EnrollmentService');
    const enrollmentRepository = this.container.get<IEnrollmentRepository<any>>('EnrollmentRepository');
    return { enrollmentController, enrollmentService, enrollmentRepository };
  }
}

const enrollmentContainer = new EnrollmentContainer();
const { enrollmentController, enrollmentService, enrollmentRepository } = enrollmentContainer.export();
export { enrollmentController, enrollmentService, enrollmentRepository };
