import { BaseRes } from '@/dto/base.res';
import { Expose } from 'class-transformer';

export class EmployeeRes extends BaseRes {
  @Expose()
  id!: string;
  @Expose()
  roleId!: string;
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  phoneNumber!: string;
}
