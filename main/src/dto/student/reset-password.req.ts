import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordReqDto {
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  newPassword!: string;

  @IsString()
  @IsNotEmpty({ message: 'ID của sinh viên không được để trống' })
  studentId!: string;
}
