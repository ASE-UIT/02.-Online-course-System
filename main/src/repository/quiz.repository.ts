import { Quiz } from '@/models/quiz.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class QuizRepository extends BaseRepository<Quiz> implements IQuizRepository<Quiz> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Quiz));
  }
}
