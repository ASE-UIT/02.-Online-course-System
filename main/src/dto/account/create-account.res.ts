import { Expose } from 'class-transformer';

export class CreateAccountRes {
  @Expose()
  roleId!: string;

  @Expose()
  email!: string;
}
