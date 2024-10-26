import { UpdateCourseRequest } from './../dto/course/update-course-req';
import { PERMISSIONS } from '@/constants/permission.constants';
import { courseController } from '@/container/course.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
import { CreateCourseRequest } from '@/dto/course/create-course.req';
import { classValidate } from '@/middleware/class-validate.middleware';


const courseRouter = express.Router();


courseRouter
  .post('/', classValidate(CreateCourseRequest), courseController.create.bind(courseController)) // Tạo khóa học

  .put('/:id', classValidate(UpdateCourseRequest), courseController.update.bind(courseController)) // Cập nhật khóa học


courseRouter
.post('/', classValidate(CreateCourseRequest), courseController.create.bind(courseController))
.put(
  '/softDelete/:id',
  authenticateJWT,
  checkPermission([PERMISSIONS.MANAGE_COURSE]),
  courseController.softDelete.bind(courseController)
)
.put('/:id', classValidate(UpdateCourseRequest), courseController.update.bind(courseController)) // Cập nhật khóa học
.get('/paging', courseController.findAllWithPaging.bind(courseController))

.get('/', courseController.findAll.bind(courseController));

export default courseRouter;
