import { Employee } from '@/models/employee.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class EmployeeRepository extends BaseRepository<Employee> implements IEmployeeRepository<Employee> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Employee));
  }
}
