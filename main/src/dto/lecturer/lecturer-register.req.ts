import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class LecturerRegisterReq {
  @Expose()
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
  @MaxLength(100)
  @Expose()
  address!: string;
  @IsOptional()
  @Expose()
  bio?: string;
  @IsString()
  @MinLength(6)
  @MaxLength(150)
  @Expose()
  password!: string;
}
