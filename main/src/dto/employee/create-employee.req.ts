import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEmployeeReq {
  @IsString()
  @Expose()
  roleId!: string;

  @IsString()
  @MaxLength(50)
  name!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  @IsString()
  @MaxLength(150)
  @MinLength(6)
  password!: string;
}
