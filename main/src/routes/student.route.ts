import { studentController } from '@/container/student.container';
import { StudentGoogleCallbackReq } from '@/dto/student/student-google-callback.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
import { ForgotPasswordReqDto } from '@/dto/student/forgot-password.req';
import { VerifyOtpReqDto } from '@/dto/student/verify-otp.req';
import { ResetPasswordReqDto } from '@/dto/student/reset-password.req';
import { ChangePasswordReqDto } from '@/dto/student/change-password.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { UpdateProfileReqDto } from '@/dto/student/update-profile.req';
const studentRouter = express.Router();

studentRouter.post(
  '/auth/google/callback',
  classValidate(StudentGoogleCallbackReq),
  studentController.authGoogleCallback.bind(studentController)
);

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
