import { EmployeeController } from '@/controller/employee.controller';
import { EmployeeService } from '@/service/employee.service';
import { Employee } from '@/models/employee.model';
import { EmployeeRepository } from '@/repository/employee.repository';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { BaseContainer } from '@/container/base.container';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { roleRepository } from '@/container/role.container';

class EmployeeContainer extends BaseContainer {
  constructor() {
    super(Employee);
    this.container.bind<IEmployeeService<Employee>>('EmployeeService').to(EmployeeService);
    this.container.bind<IEmployeeRepository<Employee>>('EmployeeRepository').to(EmployeeRepository);
    this.container.bind<EmployeeController>(EmployeeController).toSelf();

    //Import
    this.container.bind<IRoleRepository<any>>('RoleRepository').toConstantValue(roleRepository);
  }

  export() {
    const employeeController = this.container.get<EmployeeController>(EmployeeController);
    const employeeService = this.container.get<IEmployeeService<any>>('EmployeeService');
    const employeeRepository = this.container.get<IEmployeeRepository<any>>('EmployeeRepository');
    return { employeeController, employeeService, employeeRepository };
  }
}

const employeeContainer = new EmployeeContainer();
const { employeeController, employeeService, employeeRepository } = employeeContainer.export();
export { employeeController, employeeService, employeeRepository };
