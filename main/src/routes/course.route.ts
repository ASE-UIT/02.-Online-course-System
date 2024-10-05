import { PERMISSIONS } from '@/constants/permission.constants';
import { courseController } from '@/container/course.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import express from 'express';

const courseRouter = express.Router();

courseRouter.put(
  '/softDelete/:id',
  authenticateJWT,
  checkPermission([PERMISSIONS.MANAGE_COURSE]),
  courseController.softDelete.bind(courseController)
);

export default courseRouter;
