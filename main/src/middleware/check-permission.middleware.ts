import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';

export const checkPermission = (permissions: string[]) => (req: any, res: any, next: any) => {
  try {
    const user: JwtClaimDto = req.user;
    const userPermissions = user.permissionIds;

    const hasPermission = permissions.some((permission) => userPermissions.includes(permission));

    if (!hasPermission) {
      throw new BaseError(ErrorCode.PERMISSION_01, "You don't have permission to access this resource");
    }
    next();
  } catch (error) {
    next(error);
  }
};
