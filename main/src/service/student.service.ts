import { StudentRegisterPhoneReq } from '@/dto/student/student-register-phone.req';
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
import { FacebookAuthProfileDto } from '@/dto/facebook-auth-profile.dto';
import redis from '@/utils/redis/redis.util';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { SmsActivateCacheDto } from '@/dto/sms-active-cache.dto';
import { StudentRegisterEmailReq } from '@/dto/student/student-register-email.req';
import { sendEmail } from '@/utils/email/email-sender.util';
import { EmailActivateCacheDto } from '@/dto/email-active-cache.dto';
import { StudentLoginReq } from '@/dto/student/student-login.req';
import { Cart } from '@/models/cart.model';
import { sendSms } from '@/utils/sms/sms-sender.util';

@injectable()
export class StudentService extends BaseCrudService<Student> implements IStudentService<Student> {
  private studentRepository: IStudentRepository<Student>;

  constructor(@inject('StudentRepository') studentRepository: IStudentRepository<Student>) {
    super(studentRepository);
    this.studentRepository = studentRepository;
  }

  /**
   * * Đây là hàm xử lý xác thực logic khi người dùng đăng ký bằng email
   * @param email
   * @param code
   */
  async activateEmail(email: string, code: string): Promise<string> {
    const emailActivateCached = await redis.get(`${RedisSchemaEnum.noneActiveEmailUserData}::${email}`);
    if (!emailActivateCached) {
      throw new BaseError(ErrorCode.PHONE_NUMBER_NOT_FOUND, 'Số điện thoại không tồn tại');
    }

    const emailActivateCachedDto: EmailActivateCacheDto = JSON.parse(emailActivateCached);
    if (emailActivateCachedDto.code !== code) {
      throw new BaseError(ErrorCode.INVALID_CODE, 'Mã OTP không đúng');
    }

    const { tempUser } = emailActivateCachedDto;

    console.log('Temp user', tempUser);

    const student = convertToDto(StudentRegisterEmailReq, tempUser);

    console.log('Student', student);

    (student as Student).roleId = RoleEnum.STUDENT;

    //Create cart for student
    const cart = new Cart();
    (student as Student).cart = cart;

    await this.studentRepository.create({
      data: student
    });

    return 'Xác thực email thành công, bạn có thể đăng nhập ngay bây giờ';
  }

  /**
   * * Đây là hàm xử lý logic khi người dùng đăng ký bằng email
   * @param data
   */
  async registerEmail(data: StudentRegisterEmailReq): Promise<void> {
    if (
      await this.studentRepository.exists({
        filter: {
          email: data.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Số điện thoại đã tồn tại');
    }

    data.password = bcrypt.hashSync(data.password, 10);

    const code = await generateRandomString();

    redis.set(
      `${RedisSchemaEnum.noneActiveEmailUserData}::${data.email}`,
      JSON.stringify(new EmailActivateCacheDto(data, code)),
      'EX',
      (TIME_CONSTANTS.MINUTE * 3) / 1000
    );

    //Valid phone number or email
    await sendEmail({
      from: { name: 'Edhub.io.vn - Hệ thống học trực tuyến' },
      to: {
        emailAddress: [data.email]
      },
      subject: 'Xác thực tài khoản Edhub',
      text: `Mã xác thực của bạn là: ${code}`
    });

    return;
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

    console.log('Facebook user data', userData);

    if (userData.error) {
      throw new BaseError(ErrorCode.AUTH_01, 'Đăng nhập/Đăng ký thất bại');
    }

    const facebookUser = userData as FacebookAuthProfileDto;

    console.log('Facebook user', facebookUser);

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

    //Create cart for student
    const cart = new Cart();
    newStudent.cart = cart;

    await this.studentRepository.create({
      data: newStudent
    });

    //Generate token
    const token = await this.generateToken(newStudent);
    return new LoginRes(token);
  }

  /**
   * * Đây là hàm xử lý logic khi người dùng đăng nhập bằng email hoặc số điện thoại
   * @param data
   * @returns
   */
  async login(data: StudentLoginReq): Promise<LoginRes> {
    const { phoneNumberOrEmail, password } = data;

    //Get student by phone number
    const studentWithPhone = await this.studentRepository.findOne({
      filter: { phoneNumber: phoneNumberOrEmail }
    });

    //Get student by email
    const studentWithEmail = await this.studentRepository.findOne({
      filter: { email: phoneNumberOrEmail }
    });

    if (!studentWithPhone && !studentWithEmail) {
      throw new BaseError(ErrorCode.NF_01, 'Tài khoản không tồn tại');
    }
    const student = studentWithPhone || studentWithEmail;

    if (!bcrypt.compareSync(password, student!.password)) {
      throw new BaseError(ErrorCode.AUTH_01, 'Sai mật khẩu');
    }

    const token = await this.generateToken(student!);

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

    //Create cart for student
    const cart = new Cart();
    newStudent.cart = cart;

    await this.studentRepository.create({
      data: newStudent
    });

    //Generate token
    const token = await this.generateToken(newStudent);
    return new LoginRes(token);
  }

  async registerPhone(data: StudentRegisterPhoneReq): Promise<void> {
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

    //Valid phone number or email
    await sendSmsForActivation(data.phoneNumber, data);

    return;
  }

  async activatePhoneNumber(phoneNumber: string, code: string): Promise<string> {
    console.log('Activate phone number', phoneNumber, code);

    const smsActivateCache = await redis.get(`${RedisSchemaEnum.noneActivePhoneUserData}::${phoneNumber}`);
    if (!smsActivateCache) {
      throw new BaseError(ErrorCode.PHONE_NUMBER_NOT_FOUND, 'Số điện thoại không tồn tại');
    }

    const smsActivateCacheDto: SmsActivateCacheDto = JSON.parse(smsActivateCache);
    if (smsActivateCacheDto.code !== code) {
      throw new BaseError(ErrorCode.INVALID_CODE, 'Mã OTP không đúng');
    }

    const { tempUser } = smsActivateCacheDto;

    console.log('Temp user', tempUser);

    const student = convertToDto(StudentRegisterPhoneReq, tempUser);

    console.log('Student', student);

    (student as Student).roleId = RoleEnum.STUDENT;

    //Create cart for student
    const cart = new Cart();
    (student as Student).cart = cart;

    await this.studentRepository.create({
      data: student
    });

    return 'Xác thực số điện thoại thành công, bạn có thể đăng nhập ngay bây giờ';
  }

  async initiateForgotPassword(emailOrPhone: string): Promise<void> {
    const otpKey = `student:forgotPassword:${emailOrPhone}`;

    const extistOtp = await redis.get(otpKey);

    if (extistOtp) {
      throw new BaseError(ErrorCode.INVALID_OTP, 'Mã OTP đã được gửi, vui lòng kiểm tra email hoặc số điện thoại');
    }

    const student = await this.studentRepository.findOne({
      filter: emailOrPhone.includes('@') ? { email: emailOrPhone } : { phoneNumber: emailOrPhone }
    });

    if (!student) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Không tìm thấy tài khoản học viên');
    }

    const otp = await generateRandomOTPString(6); // Tạo OTP 6 ký tự
    await redis.set(otpKey, otp, 'EX', (TIME_CONSTANTS.MINUTE * 3) / 1000);

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
  async verifyForgotPasswordOtp(emailOrPhone: string, otp: string): Promise<void> {
    const otpKey = `student:forgotPassword:${emailOrPhone}`;
    const storedOtp = await redis.get(otpKey);

    if (!storedOtp || storedOtp !== otp) {
      throw new BaseError(ErrorCode.INVALID_OTP, 'Mã OTP không hợp lệ hoặc hết hạn');
    }
    await redis.set(otpKey, otp, 'EX', (TIME_CONSTANTS.MINUTE * 5) / 1000);
  }

  /**
   * Resets the password after OTP verification.
   */
  async resetPassword(emailOrPhone: string, newPassword: string, otp: string): Promise<void> {
    const otpKey = `student:forgotPassword:${emailOrPhone}`;
    const storedOtp = await redis.get(otpKey);

    if (!storedOtp) {
      throw new BaseError(ErrorCode.INVALID_OTP, 'Mã OTP hết hạn');
    }

    if (storedOtp !== otp) {
      throw new BaseError(ErrorCode.INVALID_OTP, 'Mã OTP không hợp lệ');
    }

    const student = await this.studentRepository.findOne({
      filter: emailOrPhone.includes('@') ? { email: emailOrPhone } : { phoneNumber: emailOrPhone }
    });

    if (!student) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Không tìm thấy tài khoản học viên');
    }

    if (!student) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'không tìm thấy tài khoản học viên');
    }

    student.password = bcrypt.hashSync(newPassword, 10);

    await this.studentRepository.findOneAndUpdate({
      filter: { id: student.id },
      updateData: {
        password: student.password
      }
    });

    redis.del(otpKey);
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
