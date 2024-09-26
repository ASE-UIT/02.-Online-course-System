import { Employee } from '@/models/employee.model';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import { inject, injectable } from 'inversify';

@injectable()
export class EmployeeService extends BaseCrudService<Employee> implements IEmployeeService<Employee> {
  private employeeRepository: IEmployeeRepository<Employee>;

  constructor(@inject('EmployeeRepository') employeeRepository: IEmployeeRepository<Employee>) {
    super(employeeRepository);
    this.employeeRepository = employeeRepository;
  }
}
