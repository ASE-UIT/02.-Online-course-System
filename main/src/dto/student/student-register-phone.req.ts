import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class StudentRegisterPhoneReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name!: string;

  @IsPhoneNumber()
  @Expose()
  phoneNumber!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(150)
  @Expose()
  password!: string;
}
