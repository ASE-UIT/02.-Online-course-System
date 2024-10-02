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

@injectable()
export class EmployeeService extends BaseCrudService<Employee> implements IEmployeeService<Employee> {
  private employeeRepository: IEmployeeRepository<Employee>;
  private roleRepository: IRoleRepository<Role>;

  constructor(
    @inject('EmployeeRepository') employeeRepository: IEmployeeRepository<Employee>,
    @inject('RoleRepository') roleRepository: IRoleRepository<Role>
  ) {
    super(employeeRepository);
    this.employeeRepository = employeeRepository;
    this.roleRepository = roleRepository;
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

    const employeeRole = employee?.role;

    const employeePermissions = await employeeRole?.permissions;

    const employeePermissionIds = employeePermissions!.map((permission) => permission.id) || [''];

    const jwtClaim = new JwtClaimDto(employee!.id, '', employeePermissionIds, employeeRole!.id);

    const secretKey = process.env.LOGIN_SECRET_KEY || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, {
      expiresIn: TIME_CONSTANTS.DAY * 3
    });

    return new LoginRes(token);
  }
}
