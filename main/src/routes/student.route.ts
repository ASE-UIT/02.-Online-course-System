import { studentController } from '@/container/student.container';
import { StudentGoogleCallbackReq } from '@/dto/student/student-google-callback.req';
import { StudentLoginReq } from '@/dto/student/student-login.req';
import { StudentRegisterEmailReq } from '@/dto/student/student-register-email.req';
import { StudentRegisterPhoneReq } from '@/dto/student/student-register-phone.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
import { ForgotPasswordReqDto } from '@/dto/student/forgot-password.req';
import { VerifyOtpReqDto } from '@/dto/student/verify-otp.req';
import { ResetPasswordReqDto } from '@/dto/student/reset-password.req';
import { ChangePasswordReqDto } from '@/dto/student/change-password.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { UpdateProfileReqDto } from '@/dto/student/update-profile.req';
const studentRouter = express.Router();

studentRouter

  .post('/activate-phone', studentController.activatePhoneNumber.bind(studentController))

  .post('/activate-email', studentController.activateEmail.bind(studentController))

  .post(
    '/register-email',
    classValidate(StudentRegisterEmailReq),
    studentController.registerEmail.bind(studentController)
  )

  .post(
    '/register-phone',
    classValidate(StudentRegisterPhoneReq),
    studentController.registerPhone.bind(studentController)
  )

  .post('/auth/facebook/callback', studentController.authFacebookCallback.bind(studentController))

  .post(
    '/auth/google/callback',
    classValidate(StudentGoogleCallbackReq),
    studentController.authGoogleCallback.bind(studentController)
  )

  .post('/login', classValidate(StudentLoginReq), studentController.login.bind(studentController));

studentRouter.post(
  '/forgot-password',
  classValidate(ForgotPasswordReqDto),
  studentController.forgotPassword.bind(studentController)
);

studentRouter.post(
  '/forgot-password',
  classValidate(ForgotPasswordReqDto),
  studentController.forgotPassword.bind(studentController)
);

studentRouter.post('/verify-otp', classValidate(VerifyOtpReqDto), studentController.verifyOtp.bind(studentController));

studentRouter.post(
  '/reset-password',
  classValidate(ResetPasswordReqDto),
  studentController.resetPassword.bind(studentController)
);

studentRouter.post(
  '/change-password',
  classValidate(ChangePasswordReqDto),
  authenticateJWT, // Middleware xác thực người dùng
  studentController.changePassword.bind(studentController)
);

studentRouter.patch(
  '/profile',
  classValidate(UpdateProfileReqDto),
  authenticateJWT, // Middleware xác thực người dùng
  studentController.updateProfile.bind(studentController)
);
export default studentRouter;
