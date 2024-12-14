import { IsString, IsOptional, IsUUID} from 'class-validator';

export class UpdateLecturerDto {
  @IsUUID
  id!: string; // ID giảng viên

  @IsString()
  @IsOptional()
  avatar?: string; // Ảnh đại diện

  @IsString()
  @IsOptional()
  name?: string; // Họ tên

  @IsString()
  @IsOptional()
  title?: string; // Chức danh

  @IsString()
  @IsOptional()
  email?: string; // Email

  @IsString()
  @IsOptional()
  phoneNumber?: string; // Số điện thoại

  @IsString()
  @IsOptional()
  password?: string; // Mật khẩu tài khoản
}
