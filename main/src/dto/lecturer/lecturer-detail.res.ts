import { BaseRes } from '@/dto/base.res';
import { Expose } from 'class-transformer';

export class LecturerDetailRes extends BaseRes {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  emailVerified!: boolean;
  @Expose()
  phoneNumber!: string;
  @Expose()
  address!: string;
  @Expose()
  bio?: string;
  @Expose()
  isApproved!: boolean;
  @Expose()
  totalCourse!: number;
}
