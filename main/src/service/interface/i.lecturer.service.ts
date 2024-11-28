import { LecturerDetailRes } from '@/dto/lecturer/lecturer-detail.res';
import { LecturerGetCourseRes } from '@/dto/lecturer/lecturer-get-course.res';
import { LecturerLoginReq } from '@/dto/lecturer/lecturer-login.req';
import { LecturerRegisterReq } from '@/dto/lecturer/lecturer-register.req';
import { LecturerRes } from '@/dto/lecturer/lecturer.res';
import { LoginRes } from '@/dto/login.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { promises } from 'dns';

export interface ILecturerService<T extends BaseModelType> extends IBaseCrudService<T> {
  findCoursesByLecturer(lecturerId: string): Promise<LecturerGetCourseRes>;
  register(data: LecturerRegisterReq): Promise<LecturerRes>;
  activatePhoneNumber(phoneNumber: string, code: string): Promise<string>;
  login(data: LecturerLoginReq): Promise<LoginRes>;
  getDetail(id: string): Promise<LecturerDetailRes>;

  changePassword(lecturerId: string, currentPassword: string, newPassword: string): Promise<void>;
}
