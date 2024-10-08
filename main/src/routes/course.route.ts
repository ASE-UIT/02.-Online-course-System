import { PERMISSIONS } from '@/constants/permission.constants';
import { courseController } from '@/container/course.container';
import { CourseRes } from '@/dto/course/course.res';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';

const courseRouter = express.Router();
export default courseRouter;

courseRouter.put(
  '/softDelete/:id',
  authenticateJWT,
  checkPermission([PERMISSIONS.MANAGE_COURSE]),
  courseController.softDelete.bind(courseController)
);
courseRouter.get(
      '/findallwithpaging',
      authenticateJWT,
      classValidate(CourseRes),
      courseController.findAllWithPaging.bind(courseController) 
    );
    
courseRouter.get(
        '/findall',
        authenticateJWT,
        classValidate(CourseRes),
        courseController.findAll.bind(courseController) 
      );
