import { BaseContainer } from '@/container/base.container';
import { RoleController } from '@/controller/role.controller';
import { Role } from '@/models/role.model';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { RoleRepository } from '@/repository/role.repository';
import { IRoleService } from '@/service/interface/i.role.service';
import { RoleService } from '@/service/role.service';

class RoleContainer extends BaseContainer {
  constructor() {
    super(Role);
    this.container.bind<IRoleService<Role>>('RoleService').to(RoleService);
    this.container.bind<IRoleRepository<Role>>('RoleRepository').to(RoleRepository);
    this.container.bind<RoleController>(RoleController).toSelf();
  }
  export() {
    const roleController = this.container.get<RoleController>(RoleController);
    const roleService = this.container.get<IRoleService<any>>('RoleService');
    return { roleController, roleService };
  }
}

const roleContainer = new RoleContainer();
const { roleController, roleService } = roleContainer.export();
export { roleController, roleService };
