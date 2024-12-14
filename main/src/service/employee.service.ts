import { LecturerRepository } from '@/repository/lecturer.repository';
import { EmployeeLoginReq } from '@/dto/employee/employee-login.req';
import { LoginRes } from '@/dto/login.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Employee } from '@/models/employee.model';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { Role } from '@/models/role.model';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { TIME_CONSTANTS } from '@/constants/time.constants';
import { Lecturer } from '@/models/lecturer.model';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { UpdateLecturerDto } from '@/dto/employee/update-lecturer.req';
import { UpdateLecturerRes } from '@/dto/employee/update-lecturer.res';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { sendEmail } from '@/utils/email/email-sender.util';

@injectable()
export class EmployeeService extends BaseCrudService<Employee> implements IEmployeeService<Employee> {
  private employeeRepository: IEmployeeRepository<Employee>;
  private roleRepository: IRoleRepository<Role>;
  private lecturerRepository: ILecturerRepository<Lecturer>;

  constructor(
    @inject('EmployeeRepository') employeeRepository: IEmployeeRepository<Employee>,
    @inject('RoleRepository') roleRepository: IRoleRepository<Role>,
    @inject('LecturerRepository') lecturerRepository: ILecturerRepository<Lecturer>
  ) {
    super(employeeRepository);
    this.employeeRepository = employeeRepository;
    this.roleRepository = roleRepository;
    this.lecturerRepository = lecturerRepository;
  }
  async login(data: EmployeeLoginReq): Promise<LoginRes> {
    const { phoneNumberOrEmail, password } = data;

    //Get employee by phone number
    const employeeWithPhone = await this.employeeRepository.findOne({
      filter: { phoneNumber: phoneNumberOrEmail }
    });

    //Get employee by email
    const employeeWithEmail = await this.employeeRepository.findOne({
      filter: { email: phoneNumberOrEmail }
    });

    if (!employeeWithPhone && !employeeWithEmail) {
      throw new BaseError(ErrorCode.NF_01, 'Employee not found');
    }
    const employee = employeeWithPhone || employeeWithEmail;

    if (!bcrypt.compareSync(password, employee!.password)) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    const employeeRole = await employee?.role;

    const employeePermissions = await employeeRole?.permissions;

    const employeePermissionIds = employeePermissions!.map((permission) => permission.id) || [''];

    const jwtClaim = new JwtClaimDto(employee!.id, '', employeePermissionIds, employeeRole!.id);

    const secretKey = process.env.LOGIN_SECRET || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, {
      expiresIn: TIME_CONSTANTS.DAY * 3
    });

    return new LoginRes(token);
  }

  async addLecturer(
    currentEmployee: Employee,
    lecturerData: Partial<Lecturer>
  ): Promise<Lecturer> {
    const ALLOWED_ROLES = ['TECHNICAL_ADMIN', 'MANAGEMENT_ADMIN'];
  
    // Kiểm tra quyền của nhân viên
    if (!ALLOWED_ROLES.includes(currentEmployee.roleId)) {
      throw new BaseError(
        ErrorCode.PERMISSION_01,
        'Bạn không có quyền thực hiện hành động này.'
      );
    }
  
    // Tạo mới Lecturer
    return this.lecturerRepository.create({ data: lecturerData });
  }

  async updateLecturer(
    currentEmployee: Employee,
    lecturerId: string,
    lecturerData: UpdateLecturerDto
  ): Promise<UpdateLecturerRes> {
    const ALLOWED_ROLES = ['TECHNICAL_ADMIN', 'MANAGEMENT_ADMIN'];
  
    // Kiểm tra quyền của nhân viên
    if (!ALLOWED_ROLES.includes(currentEmployee.roleId)) {
      throw new BaseError(
        ErrorCode.PERMISSION_01,
        'Bạn không có quyền thực hiện hành động này.'
      );
    }
  
    // Cập nhật Lecturer
    const lecturer = await this.lecturerRepository.findOne({ filter: { id: lecturerId } });
    if (!lecturer) {
      throw new BaseError(ErrorCode.NF_01, 'Không tìm thấy giảng viên.');
    }

    const updatedLecturer = {... lecturer, ...lecturerData};

    await this.lecturerRepository.findOneAndUpdate({
      filter: { id: lecturerId },
      updateData: updatedLecturer
    });
    return convertToDto(UpdateLecturerRes, lecturer);
  }

  async rejectLecturerApplication(
    currentEmployee: Employee,
    lecturerId: string,
    reason: string
  ): Promise<void> {
    const ALLOWED_ROLES = ['TECHNICAL_ADMIN', 'MANAGEMENT_ADMIN'];
  
    // Kiểm tra quyền
    if (!ALLOWED_ROLES.includes(currentEmployee.roleId)) {
      throw new BaseError(
        ErrorCode.PERMISSION_01,
        'Bạn không có quyền thực hiện hành động này.'
      );
    }
  
    // Tìm Lecturer
    const lecturer = await this.lecturerRepository.findOne({ filter: { id: lecturerId } });
    if (!lecturer) {
      throw new BaseError(ErrorCode.NF_01, 'Không tìm thấy giảng viên.');
    }
  
    // Cập nhật trạng thái isApproved
    await this.lecturerRepository.findOneAndUpdate({
      filter: { id: lecturerId },
      updateData: { isApproved: false }
    });
  
    // Gửi email lý do từ chối
    const currentDate = new Date().toLocaleDateString();
    const emailContent = `Đơn đăng ký giảng viên của bạn không được duyệt vì lý do "${reason}" vào ngày ${currentDate}.`;
  
    await sendEmail({
      from: { name: 'EduHub Admin' },
      to: { emailAddress: [lecturer.email] },
      subject: 'Đơn đăng ký giảng viên bị từ chối',
      text: emailContent
    });

  }
}
