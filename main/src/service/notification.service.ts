import { Course } from '@/models/course.model';
import { CourseRating } from '@/models/course_rating.model';
import { Employee } from '@/models/employee.model';
import { Lecturer } from '@/models/lecturer.model';
import { Notification } from '@/models/notification.model';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { INotificationRepository } from '@/repository/interface/i.notification.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { INotificationService } from '@/service/interface/i.notification.service';
import { inject, injectable } from 'inversify';

@injectable()
export class NotificationService extends BaseCrudService<Notification> implements INotificationService<Notification> {
  private notificationRepository: INotificationRepository<Notification>;
  private employeeRepository: IEmployeeRepository<Employee>;

  constructor(
    @inject('NotificationRepository') notificationRepository: INotificationRepository<Notification>,
    @inject('EmployeeRepository') employeeRepository: IEmployeeRepository<Employee>
  ) {
    super(notificationRepository);
    this.notificationRepository = notificationRepository;
    this.employeeRepository = employeeRepository;
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho giảng viên khi có kết quả duyệt khóa học với title là "Kết quả duyệt khóa học"
   * Note: Nội dung lưu xuống bảng Notification như sau: "{approved ? 'Khóa học của bạn đã được duyệt thành công' : 'Khóa học của bạn đã bị từ chối'}", userId là id của giảng viên và role là 'LECTURER'
   * notiType = "COURSE_APPROVE_RESULT-{id của khóa học}"
   * @param lecturerId mã giảng viên
   * @param course thông tin khóa học
   * @param approved kết quả duyệt => nếu là true thì thông báo với content là: "Khóa học của bạn đã
   * được duyệt thành công", ngược lại thông báo: "Khóa học của bạn đã bị từ chối"
   */
  async sendWhenHaveCourseApproveResult(lecturerId: string, course: Course, approved: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho giảng viên khi có đánh giá mới với title là "Đánh giá khóa học mới"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Khóa học {courseName} của bạn vừa nhận được đánh giá {rating} sao từ học viên {studentName}", userId là id của giảng viên và role là 'LECTURER'
   * notiType = "NEW_COURSE_RATING-{id của đánh giá}"
   * @param lecturerId mã giảng viên
   * @param courseRating thông tin đánh giá
   */
  async sendWhenHaveNewCourseRating(lecturerId: string, courseRating: CourseRating): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho học viên khi hoàn thành khóa học với title là "Hoàn thành khóa học"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Chúc mừng bạn đã hoàn thành khóa học {courseName} vào lúc {thời điểm hiện tại}", userId là id của học viên và role là 'STUDENT'
   * notiType = "COMPLETE_COURSE"
   * @param studentId mã học viên
   * @param course thông tin khóa học
   */
  async sendWhenCompleteCourse(studentId: string, course: Course): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho admin khi có kết quả duyệt đăng ký giảng viên với title là "Kết quả duyệt đăng ký giảng viên"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Đăng ký giảng viên {lecturerName} đã được {approved ? 'duyệt' : 'từ chối'}", userId là id của giảng viên và role là 'LECTURER'
   * notiType = "LECTURER_REGISTER_APPROVE_RESULT"
   * @param lecturerId mã giảng viên
   * @param approved kết quả duyệt => nếu là true thì thông báo với content là: "Đăng ký giảng viên {lecturerName} đã được duyệt",
   */
  async sendWhenHaveLecturerRegisterApproveResult(lecturerId: string, approved: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho nhân viên có role_id = TECHNICAL_ADMIN, HELP_DESK, MANAGEMENT_ADMIN khi có đăng ký mới từ giảng viên với title là "Đăng ký giảng viên mới"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Giảng viên {lecturerName} vừa đăng ký", userId là id của nhân viên, notiType = "NEW_LECTURER_REGISTER-{id của giảng viên}"
   */
  async sendWhenHaveNewLecturerRegister(lecturer: Lecturer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho nhân viên có role_id = TECHNICAL_ADMIN, HELP_DESK, MANAGEMENT_ADMIN khi có yêu cầu khóa học mới từ giảng viên với title là "Yêu cầu tạo khóa học mới"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Giảng viên {lecturerName} vừa yêu cầu tạo khóa học mới", userId là id của nhân viên, notiType = "NEW_COURSE_REQUEST-{id của khóa học}"
   * @param course
   */
  async sendWhenHaveNewCourseRequest(course: Course): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
