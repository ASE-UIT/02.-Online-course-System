import { studentController } from '@/container/student.container';
import { StudentGoogleCallbackReq } from '@/dto/student/student-google-callback.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const studentRouter = express.Router();

studentRouter

  .post('/auth/facebook/callback', studentController.authFacebookCallback.bind(studentController))

  .post(
    '/auth/google/callback',
    classValidate(StudentGoogleCallbackReq),
    studentController.authGoogleCallback.bind(studentController)
  );

export default studentRouter;
