import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleEnum } from '@/enums/role.enum';
import BaseError from '@/utils/error/base.error';
import { Request } from 'express';

export class SessionUtil {
  public static getLecturerCurrentlyLoggedIn(req: Request): JwtClaimDto {
    const user = req.user;
    if (user?.roleId !== RoleEnum.LECTURER) {
      throw new BaseError(ErrorCode.PERMISSION_01, 'Chỉ người dùng có quyền giảng viên mới có quyền này');
    }
    if (!user.id) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Không tìm thấy thông tin người dùng');
    }

    return user;
  }

  public static getStudentCurrentlyLoggedIn(req: Request): JwtClaimDto {
    const user = req.user;
    if (user?.roleId !== RoleEnum.STUDENT) {
      throw new BaseError(ErrorCode.PERMISSION_01, 'Chỉ người dùng có quyền học viên mới có quyền này');
    }
    if (!user.id) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Không tìm thấy thông tin người dùng');
    }

    return user;
  }
}
