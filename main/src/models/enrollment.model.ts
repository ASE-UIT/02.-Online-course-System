import { Course } from '@/models/course.model';
import { Lecturer } from '@/models/lecturer.model';
import { Student } from '@/models/student.model';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('enrollments')
export class Enrollment {
  @PrimaryColumn({ name: 'student_id' })
  studentId!: string;

  @PrimaryColumn({ name: 'course_id' })
  courseId!: string;

  @Column({ type: 'date', name: 'enrolled_date' })
  enrolledDate!: Date;

  @Column({ type: 'enum', enum: ['active', 'completed', 'cancelled'] })
  status!: 'active' | 'completed' | 'cancelled';

  @Column({ type: 'int', nullable: false, name: 'completion_percentage' })
  completionPercentage!: number;

  @Column({ type: 'date', nullable: true, name: 'completion_date' })
  completionDate!: Date;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;
}
