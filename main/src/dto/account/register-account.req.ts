import { IsNotEmpty, IsString, IsStrongPassword, IsDateString, IsEmail } from 'class-validator';

export class RegisterAccountReq {
  @IsNotEmpty()
  @IsString()
  roleId!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password!: string;

  @IsNotEmpty()
  @IsString()
  fullname!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  phone_number!: string;

  @IsNotEmpty()
  @IsDateString()
  birthday!: Date;
}
