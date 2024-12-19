import { ErrorCode } from '@/enums/error-code.enums';
import accountRouter from '@/routes/account.route';
import cartRouter from '@/routes/cart.route';
import courseRouter from '@/routes/course.route';
import courseCategoryRouter from '@/routes/course_category.route';
import discountRouter from '@/routes/discount.route';
import employeeRouter from '@/routes/employee.route';
import lecturerRouter from '@/routes/lecturer.route';
import lessonRouter from '@/routes/lesson.route';
import mediaRouter from '@/routes/media.route';
import orderRouter from '@/routes/order.route';
import quizRouter from '@/routes/quiz.route';
import roleRouter from '@/routes/role.route';
import studentRouter from '@/routes/student.route';
import BaseError from '@/utils/error/base.error';
import courseRatingRouter from '@/routes/course_rating.route';
import studentCompleteLessonRouter from '@/routes/student_complete_lesson.route';
import paymentRouter from '@/routes/payment.route';
import statisticalRouter from '@/routes/statistical.route';
import enrollmentRouter from '@/routes/enrollment.route';
import courseRecommendationRouter from '@/routes/course_recommendation.route';

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
  app.use(`${root_api}/media`, mediaRouter);
  app.use(`${root_api}/rating`, courseRatingRouter);
  app.use(`${root_api}/student-complete-lesson`, studentCompleteLessonRouter);
  app.use(`${root_api}/payment`, paymentRouter);
  app.use(`${root_api}/statistical`, statisticalRouter);
  app.use(`${root_api}/enrollment`, enrollmentRouter);
  app.use(`${root_api}/course-recommendation`, courseRecommendationRouter);

  //Check health
  app.get(`${root_api}/health`, (req: any, res: any) => {
    res.json({
      message: 'OK'
    });
  });

  // Handle API not exists
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
