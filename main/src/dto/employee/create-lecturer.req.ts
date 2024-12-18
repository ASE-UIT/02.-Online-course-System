import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AddLecturerDto {
  @IsString()
  @IsOptional()
  avatar?: string; // Ảnh đại diện

  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống.' })
  name!: string;

  @IsString()
  @IsOptional()
  title?: string; // Chức danh

  @IsString()
  @IsNotEmpty({ message: 'Email không được để trống.' })
  email!: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string; // Số điện thoại

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  password!: string; // Mật khẩu tài khoản
}
