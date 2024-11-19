import { LessonPart } from '@/models/lesson_part.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILessonPartRepository } from '@/repository/interface/i.lesson_part.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LessonPartRepository extends BaseRepository<LessonPart> implements ILessonPartRepository<LessonPart> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(LessonPart));
  }
}
