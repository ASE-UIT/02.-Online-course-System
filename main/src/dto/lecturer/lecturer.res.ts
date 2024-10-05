import { Expose } from 'class-transformer';

export class LecturerRes {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  phoneNumber!: string;
  @Expose()
  address!: string;
  @Expose()
  bio?: string;
  @Expose()
  isApproved!: boolean;
}
