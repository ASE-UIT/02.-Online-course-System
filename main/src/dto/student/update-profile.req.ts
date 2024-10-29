import { IsString, IsOptional, Length, IsEmail } from 'class-validator';

export class UpdateProfileReqDto {
  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'Tên không được quá 50 ký tự' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15, { message: 'Số điện thoại không hợp lệ' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  avatar?: string; // URL ảnh đại diện, có thể để trống
}
