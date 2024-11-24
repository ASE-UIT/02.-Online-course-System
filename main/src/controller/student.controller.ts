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
import redis from '@/utils/redis/redis.util';
import { TIME_CONSTANTS } from '@/constants/time.constants';
import { sendEmail } from '@/utils/email/email-sender.util';
import { sendSms } from '@/utils/sms/sms-sender.util';
import { generateRandomString } from '@/utils/random/generate-random-string.util';
import { ForgotPasswordReqDto } from '@/dto/student/forgot-password.req';
import { VerifyOtpReqDto } from '@/dto/student/verify-otp.req';
import { ResetPasswordReqDto } from '@/dto/student/reset-password.req';
import { ChangePasswordReqDto } from '@/dto/student/change-password.req';
import { UpdateProfileReqDto } from '@/dto/student/update-profile.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { PagingDto } from '@/dto/paging.dto';

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
   * * POST /student/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this.studentService.login(data);
      res.send_ok('Đăng nhập thành công', result);
    } catch (error) {
      next(error);
    }
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
   * * POST /student/register-phone
   */
  async registerPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this.studentService.registerPhone(data);
      res.send_ok('Đăng ký thành công, tiếp đến hãy xác thực số điện thoại qua OTP', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /student/register-email
   */
  async registerEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this.studentService.registerEmail(data);
      res.send_ok('Đăng ký thành công, tiếp đến hãy xác thực email qua OTP', result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { emailOrPhone } = req.body as ForgotPasswordReqDto;
      await this.studentService.initiateForgotPassword(emailOrPhone);
      res.send_ok('OTP đã được gửi để đặt lại mật khẩu');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /student/activate-email
   */
  async activateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, code } = req.body;
      const result = await this.studentService.activateEmail(email, code);
      res.send_ok(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /student/verify-otp
   */
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { emailOrPhone, otp } = req.body as VerifyOtpReqDto;
      await this.studentService.verifyForgotPasswordOtp(emailOrPhone, otp);
      res.send_ok('OTP xác thực thành công');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /student/activate-phone
   */
  async activatePhoneNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, code } = req.body;
      const result = await this.studentService.activatePhoneNumber(phoneNumber, code);
      res.send_ok(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /student/reset-password
   */
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { emailOrPhone, newPassword, otp } = req.body as ResetPasswordReqDto;
      await this.studentService.resetPassword(emailOrPhone, newPassword, otp);
      res.send_ok('Mật khẩu đã được đặt lại thành công');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body as ChangePasswordReqDto;

      const student = req.user;

      if (!student) {
        throw new BaseError(ErrorCode.AUTH_01, 'Học viên chưa đăng nhập');
      }

      const studentId = student.id; // Sử dụng ID sinh viên từ `req.user` đã được xác thực

      await this.studentService.changePassword(studentId, currentPassword, newPassword);
      res.send_ok('Đổi mật khẩu thành công');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const updateData = req.body as UpdateProfileReqDto;

      const student = req.user;

      if (!student) {
        throw new BaseError(ErrorCode.AUTH_01, 'Học viên chưa đăng nhập');
      }

      const studentId = student.id; // Sử dụng ID sinh viên từ `req.user` đã được xác thực

      await this.studentService.updateProfile(studentId, updateData);
      res.send_ok('Cập nhật thông tin cá nhân thành công');
    } catch (error) {
      next(error);
    }
  }

  async getAllStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.studentService.findAll();
      res.send_ok('Danh sách tất cả học viên', result);
    } catch (error) {
      next(error);
    }
  }

  async getStudentsWithPaging(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, rpp } = req.query;
      const paging = new PagingDto(Number(page) || 1, Number(rpp) || 10);
      const result = await this.studentService.findAllWithPaging({ paging });
      res.send_ok('Danh sách học viên theo phân trang', result);
    } catch (error) {
      next(error);
    }
  }

  async getStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Student ID is required');

      const student = await this.studentService.findOne({ filter: { id } });
      if (!student) {
        res.status(404).send({ message: 'Không tìm thấy học viên' });
        return;
      }

      res.send_ok('Học viên được tìm thấy', student);
    } catch (error) {
      next(error);
    }
  }

  async softDeleteStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Student ID is required');

      await this.studentService.findOneAndDelete({ filter: { id } });
      res.send_ok('Xóa mềm học viên thành công');
    } catch (error) {
      next(error);
    }
  }

}
