import { IsNotEmpty, IsString } from 'class-validator';

export class StudentLoginReq {
  @IsString()
  @IsNotEmpty()
  phoneNumberOrEmail!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
