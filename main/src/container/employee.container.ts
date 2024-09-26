import { EmployeeController } from '@/controller/employee.controller';
import { EmployeeService } from '@/service/employee.service';
import { Employee } from '@/models/employee.model';
import { EmployeeRepository } from '@/repository/employee.repository';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { BaseContainer } from '@/container/base.container';

class EmployeeContainer extends BaseContainer {
  constructor() {
    super(Employee);
    this.container.bind<IEmployeeService<Employee>>('EmployeeService').to(EmployeeService);
    this.container.bind<IEmployeeRepository<Employee>>('EmployeeRepository').to(EmployeeRepository);
    this.container.bind<EmployeeController>(EmployeeController).toSelf();
  }

  export() {
    const employeeController = this.container.get<EmployeeController>(EmployeeController);
    const employeeService = this.container.get<IEmployeeService<any>>('EmployeeService');
    return { employeeController, employeeService };
  }
}

const employeeContainer = new EmployeeContainer();
const { employeeController, employeeService } = employeeContainer.export();
export { employeeController, employeeService };
