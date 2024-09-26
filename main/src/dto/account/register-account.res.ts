import { Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterAccountRes {
  @Expose()
  roleId!: string;

  @Expose()
  email!: string;

  @Expose()
  fullname!: string;

  @Expose()
  address!: string;

  @Expose()
  phone_number!: string;

  @Expose()
  birthday!: Date;
}
