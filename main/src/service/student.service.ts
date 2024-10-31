import { StudentRegisterReq } from '@/dto/student/student-register.req';
import { StudentRes } from '@/dto/student/student.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Student } from '@/models/student.model';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStudentService } from '@/service/interface/i.student.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { RoleEnum } from '@/enums/role.enum';
import { sendSmsForActivation } from '@/utils/sms/send-sms-for-activation.util';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { LoginRes } from '@/dto/login.res';
import { TIME_CONSTANTS } from '@/constants/time.constants';
import jwt from 'jsonwebtoken';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import _ from 'lodash';
import { generateRandomOTPString, generateRandomString } from '@/utils/random/generate-random-string.util';
import { GoogleAuthProfileDto } from '@/dto/google-auth-profile.dto';
import googleOauth2Client from '@/utils/google/google.oauth2.client';
import redis from '@/utils/redis/redis.util';
import { sendEmail } from '@/utils/email/email-sender.util';
import { sendSms } from '@/utils/sms/sms-sender.util';

@injectable()
export class StudentService extends BaseCrudService<Student> implements IStudentService<Student> {
  private studentRepository: IStudentRepository<Student>;

  constructor(@inject('StudentRepository') studentRepository: IStudentRepository<Student>) {
    super(studentRepository);
    this.studentRepository = studentRepository;
  }

  async generateToken(student: Student): Promise<string> {
    const studentRole = await student?.role;

    console.log('student role', studentRole);

    const studentPermissions = await studentRole?.permissions;

    const studentPermissionIds = studentPermissions!.map((permission) => permission.id) || [''];

    const jwtClaim = new JwtClaimDto(student!.id, '', studentPermissionIds, studentRole!.id);

    const secretKey = process.env.LOGIN_SECRET || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, {
      expiresIn: TIME_CONSTANTS.DAY * 3
    });

    return token;
  }

  async authGoogleCallback(idToken: string): Promise<LoginRes> {
    // Xác thực idToken với Google
    const ticket = await googleOauth2Client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID || ''
    });
    const payload = ticket.getPayload();

    if (!payload) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Token không hợp lệ');
    }

    const googleUser = convertToDto(GoogleAuthProfileDto, payload);

    //Check if this account is already registered
    const student = await this.studentRepository.findOne({
      filter: {
        googleId: googleUser.sub
      }
    });
    if (student) {
      //Return token
      const token = await this.generateToken(student);
      return new LoginRes(token);
    }

    //If not, create new account
    const newStudent = new Student();
    if (!googleUser.email) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Tài khoản Google của bạn không có email');
    }
    newStudent.email = googleUser.email;

    if (
      await this.studentRepository.exists({
        filter: {
          email: newStudent.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Email đã tồn tại');
    }

    newStudent.name = googleUser.name || 'No name user';
    newStudent.avatar = googleUser.picture || '';
    newStudent.googleId = googleUser.sub;
    newStudent.roleId = RoleEnum.STUDENT;

    const randomPassword = await generateRandomString();
    newStudent.password = bcrypt.hashSync(randomPassword, 10);

    await this.studentRepository.create({
      data: newStudent
    });

    //Generate token
    const token = await this.generateToken(newStudent);
    return new LoginRes(token);
  }

  async register(data: StudentRegisterReq): Promise<StudentRes> {
    if (
      await this.studentRepository.exists({
        filter: {
          email: data.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Email đã tồn tại');
    }

    if (
      await this.studentRepository.exists({
        filter: {
          phoneNumber: data.phoneNumber
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Số điện thoại đã tồn tại');
    }

    data.password = bcrypt.hashSync(data.password, 10);
    (data as unknown as Student).roleId = RoleEnum.STUDENT;

    //Valid phone number or email
    await sendSmsForActivation(data.phoneNumber, data);

    const resultDto = convertToDto(StudentRes, data);
    return resultDto;
  }

  async initiateForgotPassword(emailOrPhone: string): Promise<void> {
    const student = await this.studentRepository.findOne({
      filter: emailOrPhone.includes('@') ? { email: emailOrPhone } : { phoneNumber: emailOrPhone }
    });

    if (!student) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Không tìm thấy tài khoản học viên');
    }

    const otp = await generateRandomOTPString(6); // Tạo OTP 6 ký tự
    const otpKey = `student:forgotPassword:${student.id}`;
    await redis.set(otpKey, otp, 'EX', TIME_CONSTANTS.MINUTE * 3);

    if (emailOrPhone.includes('@')) {
      await sendEmail({
        from: { name: 'Hệ thống EduHub' },
        to: { emailAddress: [student.email] },
        subject: 'EduHub - Mã OTP đặt lại mật khẩu',
        text: `Mã OTP để đặt lại mật khẩu của bạn là ${otp}. Mã có hiệu lực trong vòng 3 phút.`
      });
    } else {
      await sendSms(`Mã OTP để đặt lại mật khẩu của bạn là ${otp}. Mã có hiệu lực trong vòng 3 phút.`, [
        student.phoneNumber
      ]);
    }
  }

  /**
   * Verifies OTP for forgot password functionality.
   */
  async verifyForgotPasswordOtp(studentId: string, otp: string): Promise<void> {
    const otpKey = `student:forgotPassword:${studentId}`;
    const storedOtp = await redis.get(otpKey);

    if (!storedOtp || storedOtp !== otp) {
      throw new BaseError(ErrorCode.INVALID_OTP, 'Mã OTP không hợp lệ hoặc hết hạn');
    }
    await redis.del(otpKey);
  }

  /**
   * Resets the password after OTP verification.
   */
  async resetPassword(studentId: string, newPassword: string): Promise<void> {
    const student = await this.studentRepository.findOne({ filter: { id: studentId } });

    if (!student) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'không tìm thấy tài khoản học viên');
    }

    student.password = bcrypt.hashSync(newPassword, 10);
    await this.studentRepository.findOneAndUpdate({ filter: { id: studentId }, updateData: student });
  }

  async changePassword(studentId: string, currentPassword: string, newPassword: string): Promise<void> {
    // Tìm sinh viên theo ID
    const student = await this.studentRepository.findOne({ filter: { id: studentId } });
    if (!student) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Không tìm thấy tài khoản học viên');
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = bcrypt.compareSync(currentPassword, student.password);
    if (!isMatch) {
      throw new BaseError(ErrorCode.INVALID_PASSWORD, 'Mật khẩu hiện tại không chính xác');
    }

    // Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu
    student.password = bcrypt.hashSync(newPassword, 10);
    await this.studentRepository.findOneAndUpdate({ filter: { id: studentId }, updateData: student });
  }

  async updateProfile(studentId: string, updateData: Partial<Student>): Promise<void> {
    const student = await this.studentRepository.findOne({ filter: { id: studentId } });
    if (!student) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Không tìm thấy tài khoản học viên');
    }

    // Kiểm tra nếu email đã tồn tại và khác với email của sinh viên hiện tại
    if (updateData.email && updateData.email !== student.email) {
      const existingStudent = await this.studentRepository.findOne({ filter: { email: updateData.email } });
      if (existingStudent) {
        throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Email đã tồn tại');
      }
    }

    // Kiểm tra nếu số điện thoại đã tồn tại và khác với số hiện tại
    if (updateData.phoneNumber && updateData.phoneNumber !== student.phoneNumber) {
      const existingStudent = await this.studentRepository.findOne({ filter: { phoneNumber: updateData.phoneNumber } });
      if (existingStudent) {
        throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Số điện thoại đã tồn tại');
      }
    }

    // Cập nhật các thông tin mới
    Object.assign(student, updateData);
    await this.studentRepository.findOneAndUpdate({ filter: { id: studentId }, updateData: student });
  }
}
