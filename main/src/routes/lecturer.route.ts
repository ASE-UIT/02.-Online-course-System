import { PERMISSIONS } from '@/constants/permission.constants';
import { lecturerController } from '@/container/lecturer.container';
import { ChangePasswordReqDto } from '@/dto/lecturer/lecturer-change-password.req';
import { LecturerLoginReq } from '@/dto/lecturer/lecturer-login.req';
import { LecturerRegisterReq } from '@/dto/lecturer/lecturer-register.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const lecturerRouter = express.Router();

lecturerRouter

  .put(
    '/approve/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.APPROVE_LECTURER_REGISTER]),
    lecturerController.approve.bind(lecturerController)
  )

  .post('/login', classValidate(LecturerLoginReq), lecturerController.login.bind(lecturerController))

  .post('/register', classValidate(LecturerRegisterReq), lecturerController.register.bind(lecturerController))

  .get('/activation/phone', lecturerController.activatePhoneNumber.bind(lecturerController))

  .get(
    '/paging',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_LECTURER]),
    lecturerController.findAllWithPaging.bind(lecturerController)
  )

  .get('/me', authenticateJWT, lecturerController.getMe.bind(lecturerController))

  .get(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_LECTURER]),
    lecturerController.findOne.bind(lecturerController)
  )
  .get(
    '/',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_LECTURER]),
    lecturerController.findAll.bind(lecturerController)
  );

lecturerRouter.patch(
  '/change-password',
  classValidate(ChangePasswordReqDto),
  authenticateJWT, // Middleware xác thực người dùng đã đăng nhập
  lecturerController.changePassword.bind(lecturerController)
);

export default lecturerRouter;
