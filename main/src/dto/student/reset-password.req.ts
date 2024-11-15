import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordReqDto {
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  newPassword!: string;

  @IsString()
  @IsNotEmpty({ message: 'Email hoặc số điện thoại của học viên không được để trống' })
  emailOrPhone!: string;

  @IsString()
  @IsNotEmpty({ message: 'Mã OTP không được để trống' })
  otp!: string;
}
