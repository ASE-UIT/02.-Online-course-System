import { Student } from '@/models/student.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class StudentRepository extends BaseRepository<Student> implements IStudentRepository<Student> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Student));
  }
}
