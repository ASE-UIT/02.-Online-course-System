import { CourseSelectRes } from '../course/course-select.res';

export const OrderSelectRes = {
  id: true,
  totalPrice: true,
  paymentId: true,
  items: {
    id: true,
    courseId: true,
    price: true,
    course: CourseSelectRes
  },
  createAt: true,
  payment: {
    id: true,
    payType: true,
    paymentStatus: true
  },
  status: true
};
