import { LecturerRegisterReq } from '@/dto/lecturer/lecturer-register.req';
import { Expose } from 'class-transformer';

export class LecturerRegisterAfterOtpDto extends LecturerRegisterReq {
  @Expose()
  roleId!: string;
}
