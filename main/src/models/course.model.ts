import { CourseStatus } from '@/enums/course-status.enum';
import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import { BaseModel } from '@/models/base.model';
import { CourseCategory } from '@/models/course_category.model';
import { Discount } from '@/models/discount.model';
import { Lecturer } from '@/models/lecturer.model';
import { Lesson } from '@/models/lesson.model';
import { LessonPart } from '@/models/lesson_part.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('courses')
export class Course extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //Tên khóa học
  @Column({ length: 150, nullable: true })
  name?: string;

  //Tên khóa học tiếng anh
  @Column({ length: 150, name: 'name_en', nullable: true })
  nameEn?: string;

  //Mô tả ngắn
  @Column({ name: 'short_description', type: 'text', nullable: true })
  shortDescription?: string;

  //Giới thiệu
  @Column({ name: 'introduction', type: 'text', nullable: true })
  introduction?: string;

  //Đối tượng tham gia
  @Column({ name: 'participants', type: 'text', nullable: true })
  participants?: string;

  //Mục tiêu khóa học
  @Column({ type: 'simple-array', nullable: true, name: 'course_targets' })
  courseTargets?: string[];

  //Chào mừng tham gia
  @Column({ type: 'varchar', length: 100, nullable: true, name: 'welcome_join' })
  welcomeJoin?: string;

  //Video sale
  @Column({ type: 'text', nullable: true, name: 'video_sale' })
  videoSale?: string;

  //Tài liệu khóa học
  @Column({ type: 'simple-array', nullable: true, name: 'course_materials' })
  courseMaterials?: string[];

  //Ảnh khoá học
  @Column({ type: 'text', nullable: true })
  thumbnail?: string;

  //Giá gốc
  @Column({ type: 'decimal', default: 0, name: 'original_price' })
  originalPrice!: number;

  //Giá bán
  @Column({ type: 'decimal', default: 0, name: 'sell_price' })
  sellPrice!: number;

  //Giá thấp nhất - dùng để check discount => discount không được < giá này
  @Column({ type: 'decimal', name: 'lowest_price', nullable: true })
  lowestPrice?: number;

  //Link nhóm học tập
  @Column({ type: 'varchar', length: 100, nullable: true })
  socialGroupLink?: string;

  //Link khóa học
  @Column({ type: 'varchar', length: 100, nullable: true })
  courseLink?: string;

  //Tags
  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  //Thời lượng khóa học
  @Column({ type: 'decimal', precision: 10, scale: 1, default: 0 })
  duration!: number;

  //Độ khóa - tạm thời BỎ
  @Column({ type: 'enum', enum: DifficultyLevel, default: DifficultyLevel.easy, name: 'difficulty_level' })
  difficultyLevel?: string;

  //Là khóa học miễn phí hay không
  @Column({ default: false, name: 'is_free_course' })
  isFreeCourse!: boolean;

  //Ngày bắt đầu khóa học miễn phí
  @Column({ type: 'date', nullable: true, name: 'start_free_date' })
  startFreeDate?: Date;

  //Ngày kết thúc khóa học miễn phí
  @Column({ type: 'date', nullable: true, name: 'end_free_date' })
  endFreeDate?: Date;

  //Ngày bắt đầu khóa học
  @Column({ type: 'date', nullable: true, name: 'start_date' })
  startDate?: Date;

  //Ngày kết thúc khóa học
  @Column({ type: 'date', nullable: true, name: 'end_date' })
  endDate?: Date;

  // Được duyệt hay chưa
  @Column({ name: 'is_approved', default: false })
  isApproved!: boolean;

  //Trạng thái
  @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.WAITING_FOR_APPROVAL })
  status!: boolean;

  //Các trường thống kê

  //Số học viên
  @Column({ default: 0, name: 'total_students' })
  totalStudents!: number;

  //Số lượt đánh giá
  @Column({ default: 0, name: 'total_reviews' })
  totalReviews!: number;

  //Trung bình điểm đánh giá
  @Column({ default: 0, name: 'average_rating' })
  averageRating!: number;

  @Column({ name: 'category_id' })
  categoryId!: string;

  @ManyToOne(() => CourseCategory)
  @JoinColumn({ name: 'category_id' })
  category!: CourseCategory;

  @Column({ name: 'lecturer_id' })
  lecturerId!: string;

  @ManyToOne(() => Lecturer)
  @JoinColumn({ name: 'lecturer_id' })
  lecturer!: Lecturer;

  @ManyToOne(() => Discount, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'discount_id' })
  discount!: Discount;

  @OneToMany(() => LessonPart, (lessonPart) => lessonPart.course, { cascade: true })
  lessonParts!: LessonPart[];
}
