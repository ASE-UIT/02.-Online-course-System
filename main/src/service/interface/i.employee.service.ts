import { update } from 'lodash';
import { EmployeeLoginReq } from '@/dto/employee/employee-login.req';
import { LoginRes } from '@/dto/login.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { Employee } from '@/models/employee.model';
import { Lecturer } from '@/models/lecturer.model';
import { UpdateLecturerRes } from '@/dto/employee/update-lecturer.res';

export interface IEmployeeService<T extends BaseModelType> extends IBaseCrudService<T> {
  login(data: EmployeeLoginReq): Promise<LoginRes>;
  addLecturer(employee:Employee ,data: any): Promise<Lecturer>;
  updateLecturer(employee:Employee,lecturerId:string, data: any): Promise<UpdateLecturerRes>;
  rejectLecturerApplication(employee:Employee,lecturerId:string, reason:string): Promise<void>;
}
