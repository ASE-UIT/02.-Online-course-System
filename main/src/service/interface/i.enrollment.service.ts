import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IEnrollmentService<T> extends IBaseCrudService<T> {
  getCertificate(id: string, courseId: string): Promise<any>;
  getInProgressEnrollment(studentId: string): Promise<T[]>;
}
