import { LecturerRegisterReq } from '@/dto/lecturer/lecturer-register.req';
import { LecturerRes } from '@/dto/lecturer/lecturer.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Lecturer } from '@/models/lecturer.model';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILecturerService } from '@/service/interface/i.lecturer.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { sendSmsForActivation } from '@/utils/sms/send-sms-for-activation.util';
import { RoleEnum } from '@/enums/role.enum';
import redis from '@/utils/redis/redis.util';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { SmsActivateCacheDto } from '@/dto/sms-active-cache.dto';
import { LoginRes } from '@/dto/login.res';
import { LecturerLoginReq } from '@/dto/lecturer/lecturer-login.req';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import jwt from 'jsonwebtoken';
import { TIME_CONSTANTS } from '@/constants/time.constants';
import _ from 'lodash';
import { LecturerRegisterAfterOtpDto } from '@/dto/lecturer/lecturer-register-after-otp.dto';
import { LecturerDetailRes } from '@/dto/lecturer/lecturer-detail.res';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { Course } from '@/models/course.model';

@injectable()
export class LecturerService extends BaseCrudService<Lecturer> implements ILecturerService<Lecturer> {
  private lecturerRepository: ILecturerRepository<Lecturer>;
  private courseRepository: ICourseRepository<Course>;

  constructor(
    @inject('LecturerRepository') lecturerRepository: ILecturerRepository<Lecturer>,
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>
  ) {
    super(lecturerRepository);
    this.lecturerRepository = lecturerRepository;
    this.courseRepository = courseRepository;
  }

  async getDetail(id: string): Promise<LecturerDetailRes> {
    const lecturer = await this.lecturerRepository.findOne({
      filter: { id: id }
    });

    if (!lecturer) {
      throw new BaseError(ErrorCode.NF_01, 'Giảng viên không tồn tại');
    }

    const result = convertToDto(LecturerDetailRes, lecturer);

    result.totalCourse = await this.courseRepository.count({
      filter: {
        lecturerId: id
      }
    });

    return result;
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

    const lecturer = convertToDto(LecturerRegisterAfterOtpDto, tempUser);

    console.log('Lecturer', lecturer);

    await this.lecturerRepository.create({
      data: lecturer
    });

    return 'Xác thực số điện thoại thành công, đơn đăng ký của bạn đã được gửi tới quản trị viên để xác thực. Vui lòng chờ trong khoảng 24h, chúng tôi sẽ liên hệ với bạn sớm nhất có thể';
  }

  async register(data: LecturerRegisterReq): Promise<LecturerRes> {
    if (
      await this.lecturerRepository.exists({
        filter: {
          email: data.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Email đã tồn tại');
    }

    if (
      await this.lecturerRepository.exists({
        filter: {
          phoneNumber: data.phoneNumber
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_ERROR, 'Số điện thoại đã tồn tại');
    }

    data.password = bcrypt.hashSync(data.password, 10);
    (data as unknown as Lecturer).roleId = RoleEnum.LECTURER;

    //Valid phone number or email
    await sendSmsForActivation(data.phoneNumber, data);

    const resultDto = convertToDto(LecturerRes, data);
    return resultDto;
  }

  async login(data: LecturerLoginReq): Promise<LoginRes> {
    const { phoneNumberOrEmail, password } = data;

    //Get lecturer by phone number
    const lecturerWithPhone = await this.lecturerRepository.findOne({
      filter: { phoneNumber: phoneNumberOrEmail, isApproved: true }
    });

    //Get lecturer by email
    const lecturerWithEmail = await this.lecturerRepository.findOne({
      filter: { email: phoneNumberOrEmail, emailVerified: true, isApproved: true }
    });

    if (!lecturerWithPhone && !lecturerWithEmail) {
      throw new BaseError(ErrorCode.NF_01, 'Tài khoản không tồn tại');
    }
    const lecturer = lecturerWithPhone || lecturerWithEmail;

    if (!bcrypt.compareSync(password, lecturer!.password)) {
      throw new BaseError(ErrorCode.AUTH_01, 'Sai mật khẩu');
    }

    const lecturerRole = await lecturer?.role;

    console.log('Lecturer role', lecturerRole);

    const lecturerPermissions = await lecturerRole?.permissions;

    const lecturerPermissionIds = lecturerPermissions!.map((permission) => permission.id) || [''];

    const jwtClaim = new JwtClaimDto(lecturer!.id, '', lecturerPermissionIds, lecturerRole!.id);

    const secretKey = process.env.LOGIN_SECRET || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, {
      expiresIn: TIME_CONSTANTS.DAY * 3
    });

    return new LoginRes(token);
  }

  async changePassword(lecturerId: string, currentPassword: string, newPassword: string): Promise<void> {
    // Tìm giảng viên theo ID
    const lecturer = await this.lecturerRepository.findOne({ filter: { id: lecturerId } });
    if (!lecturer) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Không tìm thấy tài khoản giảng viên');
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = bcrypt.compareSync(currentPassword, lecturer.password);
    if (!isMatch) {
      throw new BaseError(ErrorCode.INVALID_PASSWORD, 'Mật khẩu hiện tại không chính xác');
    }

    // Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu
    lecturer.password = bcrypt.hashSync(newPassword, 10);
    await this.lecturerRepository.findOneAndUpdate({ filter: { id: lecturerId }, updateData: lecturer });
  }
}
