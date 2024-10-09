import { PERMISSIONS } from '@/constants/permission.constants';
import { discountController } from '@/container/discount.container';
import { CreateDiscountReq } from '@/dto/discount/create-discount.req';
import { DiscountRes } from '@/dto/discount/discount.res';
import { UpdateDiscountReq } from '@/dto/discount/update-discount.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';

const discountRouter = express.Router();

discountRouter
  .post(
    '/create',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    classValidate(CreateDiscountReq),
    discountController.create.bind(discountController)
  )
  .put(
    '/:id',
    authenticateJWT,
    classValidate(UpdateDiscountReq),
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    discountController.common.update.bind(discountController.common)
  )
  .get('/paging', authenticateJWT, discountController.findAllWithPaging.bind(discountController))

  .get('/', authenticateJWT, discountController.findAll.bind(discountController));

export default discountRouter;
