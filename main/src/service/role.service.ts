import { CreateRoleWithAccountReq } from '@/dto/role/create-role-with-account.req';
import { CreateRoleWithAccountRes } from '@/dto/role/create-role-with-account.res';
import { Account } from '@/models/account.model';
import { Role } from '@/models/role.model';
import { IAccountRepository } from '@/repository/interface/i.account.repository';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IRoleService } from '@/service/interface/i.role.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { id, inject, injectable } from 'inversify';

@injectable()
export class RoleService extends BaseCrudService<Role> implements IRoleService<Role> {
  private roleRepository: IRoleRepository<Role>;

  constructor(@inject('RoleRepository') roleRepository: IRoleRepository<Role>) {
    super(roleRepository);
    this.roleRepository = roleRepository;
  }
}
