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
import { generateRandomString } from '@/utils/random/generate-random-string.util';
import { GoogleAuthProfileDto } from '@/dto/google-auth-profile.dto';
import googleOauth2Client from '@/utils/google/google.oauth2.client';
import { FacebookAuthProfileDto } from '@/dto/facebook-auth-profile.dto';

@injectable()
export class StudentService extends BaseCrudService<Student> implements IStudentService<Student> {
  private studentRepository: IStudentRepository<Student>;

  constructor(@inject('StudentRepository') studentRepository: IStudentRepository<Student>) {
    super(studentRepository);
    this.studentRepository = studentRepository;
  }
  /**
   * * Đây là hàm xử lý logic khi người dùng đăng nhập bằng Facebook
   * @param accessToken // Token xác thực từ Facebook
   */
  async authFacebookCallback(accessToken: string): Promise<LoginRes> {
    // Gửi yêu cầu đến Facebook để xác thực accessToken và lấy thông tin người dùng
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name,picture`
    );
    const userData = await response.json();

    if (userData.error) {
      throw new BaseError(ErrorCode.AUTH_01, 'Đăng nhập/Đăng ký thất bại');
    }

    const facebookUser = convertToDto(FacebookAuthProfileDto, userData);

    //Check if this account is already registered
    const student = await this.studentRepository.findOne({
      filter: {
        facebookId: facebookUser.id
      }
    });
    if (student) {
      //Return token
      const token = await this.generateToken(student);
      return new LoginRes(token);
    }

    //If not, create new account
    const newStudent = new Student();
    if (!facebookUser.email) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Tài khoản Google của bạn không có email');
    }
    newStudent.email = facebookUser.email;

    if (
      await this.studentRepository.exists({
        filter: {
          email: newStudent.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Email đã tồn tại');
    }

    newStudent.name = facebookUser.name || 'No name user';
    if (facebookUser.picture) {
      newStudent.avatar = facebookUser.picture.data.url;
    }

    newStudent.facebookId = facebookUser.id;
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
}
