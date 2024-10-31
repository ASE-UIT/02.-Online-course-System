import { UpdateCourseRequest } from './../dto/course/update-course-req';
import { PERMISSIONS } from '@/constants/permission.constants';
import { courseController } from '@/container/course.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
import { CreateCourseRequest } from '@/dto/course/create-course.req';

const courseRouter = express.Router();

courseRouter
  .post('/', authenticateJWT, classValidate(CreateCourseRequest), courseController.create.bind(courseController))

  .put(
    '/approve/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_COURSE]),
    courseController.approveCourse.bind(courseController)
  )

  .put(
    '/softDelete/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_COURSE]),
    courseController.softDelete.bind(courseController)
  )

  .put('/:id', classValidate(UpdateCourseRequest), courseController.update.bind(courseController)) // Cập nhật khóa học

  .get('/waiting-for-approve/paging', courseController.findWaitingForApprovePaging.bind(courseController))

  .get('/waiting-for-approve', courseController.findWaitingForApprove.bind(courseController))

  .get('/paging', courseController.findAllWithPaging.bind(courseController))

  .get('/live/:amount', courseController.findLive.bind(courseController))

  .get('/search', courseController.search.bind(courseController))

  .get('/:id', courseController.findById.bind(courseController))

  .get('/', courseController.findAll.bind(courseController));

export default courseRouter;
