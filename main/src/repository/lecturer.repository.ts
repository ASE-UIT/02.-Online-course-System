import { LecturerStatsDto } from '@/dto/lecturer/lecturer-stats.dto';
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

  async getLecturerStats(lecturerId: string): Promise<LecturerStatsDto> {
    const lecturerStats = new LecturerStatsDto();

    const lecturer = await this.ormRepository.findOne({ where: { id: lecturerId }, relations: ['courses'] });

    const totalCourse = (await lecturer!.courses).length;

    // const totalStudent = lecturer?.enrollments.length;

    return lecturerStats;
  }
}
