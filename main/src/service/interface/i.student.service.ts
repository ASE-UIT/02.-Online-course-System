import { GoogleAuthProfileDto } from '@/dto/google-auth-profile.dto';
import { LoginRes } from '@/dto/login.res';
import { StudentRegisterReq } from '@/dto/student/student-register.req';
import { StudentRes } from '@/dto/student/student.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IStudentService<T extends BaseModelType> extends IBaseCrudService<T> {
  authFacebookCallback(accessToken: string): Promise<LoginRes>;
  register(data: StudentRegisterReq): Promise<StudentRes>;
  authGoogleCallback(idToken: string): Promise<LoginRes>;
}
