import { BaseRes } from '../base.res';

export class UpdateLecturerRes extends BaseRes {
  id!: string; // ID của giảng viên

  avatar?: string; // Ảnh đại diện (nếu có)

  name!: string; // Họ tên giảng viên

  title?: string; // Chức danh (nếu có)

  email!: string; // Email của giảng viên

  phoneNumber?: string; // Số điện thoại (nếu có)
}
