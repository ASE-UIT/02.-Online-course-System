import { PERMISSIONS } from '@/constants/permission.constants';
import { courseRatingController } from '@/container/course_rating.container';
import { CreateCourseCategoryReq } from '@/dto/course_category/create-course_category.req';
import { CreateCourseRatingReq } from '@/dto/course_rating/create-course_rating.req';
import { UpdateCourseRatingReq } from '@/dto/course_rating/update-course_rating.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const courseRatingRouter = express.Router();

export default courseRatingRouter;
courseRatingRouter
.post(
  '/',
  authenticateJWT,
  classValidate(CreateCourseRatingReq),
  courseRatingController.create.bind(courseRatingController)
)

.put(
  '/',
  authenticateJWT,
  classValidate(UpdateCourseRatingReq),
  courseRatingController.update.bind(courseRatingController)
)
.get(
  '/',
  courseRatingController.search.bind(courseRatingController)
)
