import { StudentRepository } from './../repository/student.repository';
import { Student } from './../models/student.model';
import { filter } from 'lodash';
import { StudentRepository } from '@/repository/student.repository';
import { StudentService } from './student.service';
import { IBaseCrudController } from './../controller/interfaces/i.base-curd.controller';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
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
import { sendEmail } from '@/utils/email/email-sender.util';
import { NotificationRepository } from '@/repository/notification.repository';
import BaseError from '@/utils/error/base.error';
import { ErrorCode } from '@/enums/error-code.enums';

NotificationRepository

@injectable()
export class NotificationService extends BaseCrudService<Notification> implements INotificationService<Notification> {
  private notificationRepository: INotificationRepository<Notification>;
  private employeeRepository: IEmployeeRepository<Employee>;
  private studentRepository: IStudentRepository<Student>;

  constructor(
    @inject('NotificationRepository') notificationRepository: INotificationRepository<Notification>,
    @inject('EmployeeRepository') employeeRepository: IEmployeeRepository<Employee>,
    @inject('StudentRepository') studentRepository: IStudentRepository<Student>

  ) {
    super(notificationRepository);
    this.notificationRepository = notificationRepository;
    this.employeeRepository = employeeRepository;
    this.studentRepository = studentRepository;
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
    const content = approved
      ? 'Khóa học của bạn đã được duyệt thành công'
      : 'Khóa học của bạn đã bị từ chối';

    const notification = {
      title: 'Kết quả duyệt khóa học',
      content,
      userId: lecturerId,
      role: 'LECTURER',
      notiType: `COURSE_APPROVE_RESULT-${course.id}`,
    };

    //Tạo thông báo
    await this.notificationRepository.create({data: notification});

   
    // Gửi email
    try {
      await sendEmail({
        from: { name: 'Hệ thống thông báo' },
        to: { emailAddress: [course.lecturer.email] }, 
        subject: 'Kết quả duyệt khóa học',
        text: content,
      });
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Gửi email về thông báo duyệt khóa học thất bại: ', error);
    }
    
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho giảng viên khi có đánh giá mới với title là "Đánh giá khóa học mới"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Khóa học {courseName} của bạn vừa nhận được đánh giá {rating} sao từ học viên {studentName}", userId là id của giảng viên và role là 'LECTURER'
   * notiType = "NEW_COURSE_RATING-{id của đánh giá}"
   * @param lecturerId mã giảng viên
   * @param courseRating thông tin đánh giá
   */
  async sendWhenHaveNewCourseRating(lecturerId: string, courseRating: CourseRating): Promise<void> {


    const content = `Khóa học ${courseRating.course.name} của bạn vừa nhận được đánh giá ${courseRating.ratingPoint} sao từ học viên ${courseRating.student.name}`;

    //Tạo thông báo
    const notification = {
      title: 'Đánh giá khóa học mới',
      content,
      userId: lecturerId,
      role: 'LECTURER',
      notiType: `NEW_COURSE_RATING-${courseRating.id}`,
    };

    await this.notificationRepository.create({data:notification});

    // Gửi email
    try {
      await sendEmail({
        from: { name: 'Hệ thống thông báo' },
        to: { emailAddress: [courseRating.course.lecturer.email] }, 
        subject: 'Đánh giá khóa học mới',
        text: content,
      });
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Gửi email về thông báo đánh giá khóa học thất bại: ', error);
    }
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho học viên khi hoàn thành khóa học với title là "Hoàn thành khóa học"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Chúc mừng bạn đã hoàn thành khóa học {courseName} vào lúc {thời điểm hiện tại}", userId là id của học viên và role là 'STUDENT'
   * notiType = "COMPLETE_COURSE"
   * @param studentId mã học viên
   * @param course thông tin khóa học
   */
  async sendWhenCompleteCourse(studentId: string, course: Course): Promise<void> {
    
    const recentStudent= await this.studentRepository.findOne({filter: {id: studentId}});

    const content = `Chúc mừng bạn ${recentStudent?.name} đã hoàn thành khóa học ${course.name} vào lúc ${new Date().toLocaleString()}`;

    const notification = {
      title: 'Hoàn thành khóa học',
      content,
      userId: studentId,
      role: 'STUDENT',
      notiType: 'COMPLETE_COURSE',
    };

    await this.notificationRepository.create({data:notification});

    const mail= recentStudent?.email;

    if(!mail){
      throw new BaseError(ErrorCode.NOT_FOUND, 'Email không tồn tại');
    }
    else{
      // Gửi email
      try {
        await sendEmail({
          from: { name: 'Hệ thống thông báo' },
          to: { emailAddress: [mail] }, 
          subject: 'Hoàn thành khóa học',
          text: content,
        });
      } catch (error) {
        throw new BaseError(ErrorCode.UNKNOWN, 'Gửi email về thông báo hoàn thành khóa học thất bại: ', error);
      }
    }
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho admin khi có kết quả duyệt đăng ký giảng viên với title là "Kết quả duyệt đăng ký giảng viên"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Đăng ký giảng viên {lecturerName} đã được {approved ? 'duyệt' : 'từ chối'}", userId là id của giảng viên và role là 'LECTURER'
   * notiType = "LECTURER_REGISTER_APPROVE_RESULT"
   * @param lecturerId mã giảng viên
   * @param approved kết quả duyệt => nếu là true thì thông báo với content là: "Đăng ký giảng viên {lecturerName} đã được duyệt",
   */
  async sendWhenHaveLecturerRegisterApproveResult(lecturerId: string, approved: boolean): Promise<void> {
    
    const recentLecturer = await this.employeeRepository.findOne({filter:{id: lecturerId}});
    const content = `Đăng ký giảng viên ${recentLecturer?.name} đã ${approved ? 'được duyệt' : 'bị từ chối'}`;

    const notification = {
      title: 'Kết quả duyệt đăng ký giảng viên',
      content,
      userId: lecturerId,
      role: 'LECTURER',
      notiType: 'LECTURER_REGISTER_APPROVE_RESULT',
    };

    await this.notificationRepository.create({data:notification});

    const mail= recentLecturer?.email;

    if(!mail){
      throw new BaseError(ErrorCode.NOT_FOUND, 'Email không tồn tại');
    }
    else{
      //Gửi email
      try {
        await sendEmail({
          from: { name: 'Hệ thống thông báo' },
          to: { emailAddress: [mail] }, 
          subject: 'Kết quả duyệt đăng ký giảng viên',
          text: content,
        });
      } catch (error) {
        throw new BaseError(ErrorCode.UNKNOWN, 'Gửi email về thông báo duyệt đăng kí giảng viên thất bại: ', error);
      }
    }
  }

  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho nhân viên có role_id = TECHNICAL_ADMIN, HELP_DESK, MANAGEMENT_ADMIN khi có đăng ký mới từ giảng viên với title là "Đăng ký giảng viên mới"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Giảng viên {lecturerName} vừa đăng ký", userId là id của nhân viên, notiType = "NEW_LECTURER_REGISTER-{id của giảng viên}"
   */
  async sendWhenHaveNewLecturerRegister(lecturer: Lecturer): Promise<void> {
    
    
    const roles = ['TECHNICAL_ADMIN', 'HELP_DESK', 'MANAGEMENT_ADMIN'];

    const recentEmployees = await Promise.all(
      roles.map((role) =>
        this.employeeRepository.findMany({ filter: { roleId: role } }) //findMany không nhận mảng nên map qua từng role
      )
    );

    // Gộp danh sách nhân viên
    const employees = recentEmployees.flat();

    const notifications = employees.map((employee) => {
      const content = `Giảng viên ${lecturer.name} vừa đăng ký`;
  
      return {
        title: 'Đăng ký giảng viên mới',
        content,
        userId: employee.id,
        notiType: `NEW_LECTURER_REGISTER-${lecturer.id}`,
      };
    });

    //Tạo thông báo
    await Promise.all(
      notifications.map((notification) =>
        this.notificationRepository.create({ data: notification })
      )
    );


    await Promise.all(
      employees.map((employee) =>
        sendEmail({
          from: { name: 'Hệ thống thông báo' },
          to: { emailAddress: [employee.email] }, // Đảm bảo `employee.email` có giá trị hợp lệ
          subject: 'Đăng ký giảng viên mới',
          text: `Giảng viên ${lecturer.name} vừa đăng ký.`,
        })
      )
    );
  }
  /**
   * TODO: Gửi thông báo (email + lưu thông báo xuống bảng Notification) cho nhân viên có role_id = TECHNICAL_ADMIN, HELP_DESK, MANAGEMENT_ADMIN khi có yêu cầu khóa học mới từ giảng viên với title là "Yêu cầu tạo khóa học mới"
   * Note: Nội dung lưu xuống bảng Notification như sau: "Giảng viên {lecturerName} vừa yêu cầu tạo khóa học mới", userId là id của nhân viên, notiType = "NEW_COURSE_REQUEST-{id của khóa học}"
   * @param course
   */
  async sendWhenHaveNewCourseRequest(course: Course): Promise<void> {
    
    const roles = ['TECHNICAL_ADMIN', 'HELP_DESK', 'MANAGEMENT_ADMIN'];

    const recentEmployees = await Promise.all(
      roles.map((role) =>
        this.employeeRepository.findMany({ filter: { roleId: role } }) 
      )
    );

    // Gộp danh sách nhân viên
    const employees = recentEmployees.flat();

    const notifications = employees.map((employee) => {
      const content = `Giảng viên ${course.lecturer.name} vừa yêu cầu tạo khóa học mới`;
  
      return {
        title: 'Yêu cầu tạo khóa học mới',
        content,
        userId: employee.id,
        notiType: `NEW_LECTURER_REGISTER-${course.id}`,
      };
    });

    await Promise.all(
      notifications.map((notification) =>
        this.notificationRepository.create({ data: notification })
      )
    );


    await Promise.all(
      employees.map((employee) =>
        sendEmail({
          from: { name: 'Hệ thống thông báo' },
          to: { emailAddress: [employee.email] }, 
          subject: 'Yêu cầu tạo khóa học mới',
          text: `Giảng viên ${course.lecturer.name} vừa yêu cầu tạo khóa học mới.`,
        })
      )
    );
  }
}
