import { Account } from '@/models/account.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IAccountRepository } from '@/repository/interface/i.account.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class AccountRepository extends BaseRepository<Account> implements IAccountRepository<Account> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Account));
  }
}
