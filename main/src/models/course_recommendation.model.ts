import { BaseModel } from '@/models/base.model';
import { Student } from '@/models/student.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course_recommendations')
export class CourseRecommendation extends BaseModel {
  @PrimaryColumn({ name: 'student_id' })
  studentId!: string;

  @Column({ name: 'courses', type: 'simple-array', nullable: true })
  courses?: string[];

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student!: Student;
}
