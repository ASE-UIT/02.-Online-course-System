import { Enrollment } from '@/models/enrollment.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class EnrollmentRepository extends BaseRepository<Enrollment> implements IEnrollmentRepository<Enrollment> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Enrollment));
  }
}
