import { studentController } from '@/container/student.container';
import { StudentGoogleCallbackReq } from '@/dto/student/student-google-callback.req';
import { StudentLoginReq } from '@/dto/student/student-login.req';
import { StudentRegisterEmailReq } from '@/dto/student/student-register-email.req';
import { StudentRegisterPhoneReq } from '@/dto/student/student-register-phone.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
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

export default studentRouter;
