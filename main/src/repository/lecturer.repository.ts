import { Lecturer } from '@/models/lecturer.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LecturerRepository extends BaseRepository<Lecturer> implements ILecturerRepository<Lecturer> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Lecturer));
  }
}
