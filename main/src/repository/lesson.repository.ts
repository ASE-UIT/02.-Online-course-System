import { Lesson } from '@/models/lesson.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILessonRepository } from '@/repository/interface/i.lesson.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LessonRepository extends BaseRepository<Lesson> implements ILessonRepository<Lesson> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Lesson));
  }
}
