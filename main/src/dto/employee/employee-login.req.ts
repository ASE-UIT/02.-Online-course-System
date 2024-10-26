import { IsString, IsNotEmpty } from 'class-validator';

export class EmployeeLoginReq {
  @IsString()
  @IsNotEmpty()
  phoneNumberOrEmail!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
