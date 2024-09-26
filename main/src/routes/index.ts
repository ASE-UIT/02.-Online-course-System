import { ErrorCode } from '@/enums/error-code.enums';
import accountRouter from '@/routes/account.route';
import cartRouter from '@/routes/cart.route';
import courseRouter from '@/routes/course.route';
import courseCategoryRouter from '@/routes/course_category.route';
import discountRouter from '@/routes/discount.route';
import employeeRouter from '@/routes/employee.route';
import lecturerRouter from '@/routes/lecturer.route';
import lessonRouter from '@/routes/lesson.route';
import orderRouter from '@/routes/order.route';
import quizRouter from '@/routes/quiz.route';
import roleRouter from '@/routes/role.route';
import studentRouter from '@/routes/student.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any, root_api: string) {
  app.use(`${root_api}/student`, studentRouter);
  app.use(`${root_api}/quiz`, quizRouter);
  app.use(`${root_api}/order`, orderRouter);
  app.use(`${root_api}/employee`, employeeRouter);
  app.use(`${root_api}/cart`, cartRouter);
  app.use(`${root_api}/lesson`, lessonRouter);
  app.use(`${root_api}/lecturer`, lecturerRouter);
  app.use(`${root_api}/course-category`, courseCategoryRouter);
  app.use(`${root_api}/discount`, discountRouter);
  app.use(`${root_api}/course`, courseRouter);
  app.use(`${root_api}/account`, accountRouter);
  app.use(`${root_api}/role`, roleRouter);

  //Check health
  app.get(`${root_api}/health`, (req: any, res: any) => {
    res.send('OK');
  });

  // Handle API not exists
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
