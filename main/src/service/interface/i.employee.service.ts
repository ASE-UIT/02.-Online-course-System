import { EmployeeLoginReq } from '@/dto/employee/employee-login.req';
import { LoginRes } from '@/dto/login.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IEmployeeService<T extends BaseModelType> extends IBaseCrudService<T> {
  login(data: EmployeeLoginReq): Promise<LoginRes>;
}
