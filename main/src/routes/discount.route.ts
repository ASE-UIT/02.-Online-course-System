import { PERMISSIONS } from '@/constants/permission.constants';
import { discountController } from '@/container/discount.container';
import { CreateDiscountReq } from '@/dto/discount/create-discount.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';

const discountRouter = express.Router();

discountRouter.post(
  '/create',
  authenticateJWT,
  checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
  classValidate(CreateDiscountReq),
  discountController.create.bind(discountController)
);

export default discountRouter;
