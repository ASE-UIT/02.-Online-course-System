import { IsString, IsNotEmpty } from 'class-validator';

export class ForgotPasswordReqDto {
  @IsString()
  @IsNotEmpty({ message: 'Email hoặc số điện thoại không được để trống' })
  emailOrPhone!: string;
}
