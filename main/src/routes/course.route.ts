import { PERMISSIONS } from '@/constants/permission.constants';
import { courseController } from '@/container/course.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';

const courseRouter = express.Router();

courseRouter.put(
  '/softDelete/:id',
  authenticateJWT,
  checkPermission([PERMISSIONS.MANAGE_COURSE]),
  courseController.softDelete.bind(courseController)
);
courseRouter.get('/paging', authenticateJWT, courseController.findAllWithPaging.bind(courseController));

courseRouter.get('/', authenticateJWT, courseController.findAll.bind(courseController));

export default courseRouter;
