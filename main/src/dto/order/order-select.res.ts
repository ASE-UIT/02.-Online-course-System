import { CourseSelectRes } from '../course/course-select.res';

export const OrderSelectRes = {
  id: true,
  totalPrice: true,
  items: {
    id: true,
    courseId: true,
    price: true,
    course: CourseSelectRes
  }
};
