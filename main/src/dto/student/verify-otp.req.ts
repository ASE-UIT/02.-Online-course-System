import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyOtpReqDto {
  @IsString()
  @IsNotEmpty({ message: 'Mã OTP không được để trống' })
  otp!: string;

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại hoặc email của học viên không được để trống' })
  emailOrPhone!: string;
}
