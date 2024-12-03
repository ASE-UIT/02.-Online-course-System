import { studentCompleteLessonController } from '@/container/student_complete_lesson.container';
import { UpdateStudentCompleteLessonReq } from '@/dto/student_complete_lesson/update-student-complete-lesson.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const studentCompleteLessonRouter = express.Router();

studentCompleteLessonRouter

  .get(
    '/:courseId',
    authenticateJWT,
    studentCompleteLessonController.getStudentCompleteLessonsByCourseId.bind(studentCompleteLessonController)
  )

  .put(
    '/update-progress',
    authenticateJWT,
    classValidate(UpdateStudentCompleteLessonReq),
    studentCompleteLessonController.updateProgress.bind(studentCompleteLessonController)
  );

export default studentCompleteLessonRouter;
