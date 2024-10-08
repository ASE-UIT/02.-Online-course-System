import { UpdateCourseRequest } from './../dto/course/update-course-req';
import express from 'express';
import { courseController } from '@/container/course.container';
import { CreateCourseRequest } from '@/dto/course/create-course.req';
import { classValidate } from '@/middleware/class-validate.middleware';


const courseRouter = express.Router();

courseRouter
  .post('/', classValidate(CreateCourseRequest), courseController.create.bind(courseController)) // Tạo khóa học

  .put('/:id', classValidate(UpdateCourseRequest), courseController.update.bind(courseController)) // Cập nhật khóa học


export default courseRouter;
