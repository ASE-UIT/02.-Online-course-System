import { IsString, IsNotEmpty } from 'class-validator';

export class LecturerLoginReq {
  @IsString()
  @IsNotEmpty()
  phoneNumberOrEmail!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
