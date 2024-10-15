import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class StudentRegisterReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name!: string;

  @IsEmail()
  @Expose()
  email!: string;

  @IsPhoneNumber()
  @Expose()
  phoneNumber!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(150)
  @Expose()
  password!: string;

  @IsOptional()
  @Expose()
  avatar?: string;
}
