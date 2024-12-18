import { Enrollment } from '@/models/enrollment.model';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IEnrollmentService } from '@/service/interface/i.enrollment.service';
import { inject, injectable } from 'inversify';
import { enrollmentRepository } from '@/container/enrollment.container';
import BaseError from '@/utils/error/base.error';
import { PrintServiceUtil } from '@/utils/print-service/print-service.util';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { Student } from '@/models/student.model';
import fs from 'fs';
import minioClient from '@/utils/minio/minio-instance.util';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class EnrollmentService extends BaseCrudService<Enrollment> implements IEnrollmentService<Enrollment> {
  private enrollmentRepository: IEnrollmentRepository<Enrollment>;

  constructor(@inject('EnrollmentRepository') enrollmentRepository: IEnrollmentRepository<Enrollment>) {
    super(enrollmentRepository);
    this.enrollmentRepository = enrollmentRepository;
  }

  async getCertificate(id: string, courseId: string): Promise<string> {
    //Check if the student has completed the course
    const enrollment = await this.enrollmentRepository.findOne({
      filter: { studentId: id, courseId: courseId, status: 'completed' },
      relations: ['student', 'course', 'course.lecturer']
    });

    if (!enrollment) {
      throw new BaseError('NOT_COMPLETED_COURSE', 'You have not completed this course');
    }

    if (enrollment.certificate) {
      return enrollment.certificate;
    }

    //Print the certificate
    const streamImage = await PrintServiceUtil.printCertificate({
      studentName: enrollment.student.name,
      courseName: enrollment.course.name!,
      date: enrollment.completionDate!.toString(),
      instructor: enrollment.course.lecturer.name!,
      appFounder: 'Nguyen Trinh Dong'
    });

    const tempFilePath = `certificate-${Date.now()}.jpg`;
    const writer = fs.createWriteStream(tempFilePath);
    const bucketName = GlobalConfig.media_service.image_bucket.path;
    const fileName = uuidv4();

    // Lưu stream từ API vào file tạm
    streamImage.pipe(writer);

    writer.on('finish', async () => {
      try {
        // Upload file lên MinIO
        await minioClient.fPutObject(bucketName, fileName, tempFilePath, {
          'Content-Type': 'image/jpeg' // Loại MIME của file
        });

        console.log('Upload finish');

        // Xóa file tạm sau khi upload thành công
        fs.unlinkSync(tempFilePath);
      } catch (uploadError) {
        console.error('Error uploading to MinIO:', uploadError);
      }
    });

    const certificateLink = GlobalConfig.media_service.url + '/' + bucketName + '/' + fileName;

    //Set certificate
    await this.enrollmentRepository.findOneAndUpdate({
      filter: {
        studentId: id,
        courseId: courseId
      },
      updateData: {
        certificate: certificateLink
      }
    });

    return certificateLink;
  }

  getInProgressEnrollment(studentId: string): Promise<Enrollment[]> {
    return enrollmentRepository.findInProgress(studentId);
  }
}
