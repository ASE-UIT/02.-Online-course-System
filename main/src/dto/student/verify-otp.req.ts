import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyOtpReqDto {
  @IsString()
  @IsNotEmpty({ message: 'Mã OTP không được để trống' })
  otp!: string;

  @IsString()
  @IsNotEmpty({ message: 'ID của sinh viên không được để trống' })
  studentId!: string;
}
