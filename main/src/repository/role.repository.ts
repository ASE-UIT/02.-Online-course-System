import { Role } from '@/models/role.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';

@injectable()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository<Role> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Role));
  }
}
