import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IEnrollmentService<T> extends IBaseCrudService<T> {
  getInProgressEnrollment(studentId: string): Promise<T[]>;
}
