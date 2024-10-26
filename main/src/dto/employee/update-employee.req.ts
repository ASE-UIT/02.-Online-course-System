import { IsString, MaxLength, IsEmail, IsPhoneNumber, MinLength, IsOptional } from 'class-validator';

export class UpdateEmployeeReq {
  @IsOptional()
  @IsString()
  roleId?: string;
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
  @IsOptional()
  @IsString()
  @MaxLength(150)
  @MinLength(6)
  password?: string;
}
