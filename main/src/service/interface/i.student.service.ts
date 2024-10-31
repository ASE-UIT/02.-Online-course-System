import { GoogleAuthProfileDto } from '@/dto/google-auth-profile.dto';
import { LoginRes } from '@/dto/login.res';
import { StudentRegisterReq } from '@/dto/student/student-register.req';
import { StudentRes } from '@/dto/student/student.res';
import { Student } from '@/models/student.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IStudentService<T extends BaseModelType> extends IBaseCrudService<T> {
  register(data: StudentRegisterReq): Promise<StudentRes>;
  authGoogleCallback(idToken: string): Promise<LoginRes>;

  initiateForgotPassword(emailOrPhone: string): Promise<void>;
  verifyForgotPasswordOtp(studentId: string, otp: string): Promise<void>;
  resetPassword(studentId: string, newPassword: string): Promise<void>;
  changePassword(studentId: string, currentPassword: string, newPassword: string): Promise<void>;
  updateProfile(studentId: string, updateData: Partial<T>): Promise<void>;
}
