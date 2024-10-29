import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { GoogleAuthProfileDto } from '@/dto/google-auth-profile.dto';
import { Student } from '@/models/student.model';
import { IStudentService } from '@/service/interface/i.student.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { OAuth2Client } from 'google-auth-library';
import googleOauth2Client from '@/utils/google/google.oauth2.client';
import BaseError from '@/utils/error/base.error';

@injectable()
export class StudentController {
  public common: IBaseCrudController<Student>;
  private studentService: IStudentService<Student>;
  constructor(
    @inject('StudentService') studentService: IStudentService<Student>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Student>
  ) {
    this.studentService = studentService;
    this.common = common;
  }

  /**
   * * POST /student/auth/google/callback
   */
  async authGoogleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { idToken } = req.body;
      const result = await this.studentService.authGoogleCallback(idToken);
      res.send_ok('Đăng nhập thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /student/auth/facebook/callback
   */
  async authFacebookCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        throw new BaseError('ACCESS_TOKEN_INVALID', 'Không có access token');
      }

      const result = await this.studentService.authFacebookCallback(accessToken);

      res.send_ok('Đăng nhập thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /student/register
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this.studentService.register(data);
      res.send_ok('Đăng ký thành công, tiếp đến hãy xác thực số điện thoại qua OTP', result);
    } catch (error) {
      next(error);
    }
  }
}
