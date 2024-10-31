import { GoogleAuthProfileDto } from '@/dto/google-auth-profile.dto';
import { LoginRes } from '@/dto/login.res';
import { StudentLoginReq } from '@/dto/student/student-login.req';
import { StudentRegisterEmailReq } from '@/dto/student/student-register-email.req';
import { StudentRegisterPhoneReq } from '@/dto/student/student-register-phone.req';
import { StudentRes } from '@/dto/student/student.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IStudentService<T extends BaseModelType> extends IBaseCrudService<T> {
  activateEmail(email: string, code: string): Promise<string>;
  activatePhoneNumber(phoneNumber: string, code: string): Promise<string>;
  authFacebookCallback(accessToken: string): Promise<LoginRes>;
  registerPhone(data: StudentRegisterPhoneReq): Promise<void>;
  registerEmail(data: StudentRegisterEmailReq): Promise<void>;
  authGoogleCallback(idToken: string): Promise<LoginRes>;
  login(data: StudentLoginReq): Promise<LoginRes>;
}
