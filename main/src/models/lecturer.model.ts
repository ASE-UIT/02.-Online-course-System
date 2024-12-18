import { LoginTypeEnum } from '@/enums/login-type.enum';
import { BaseModel } from '@/models/base.model';
import { Course } from '@/models/course.model';
import { Enrollment } from '@/models/enrollment.model';
import { Role } from '@/models/role.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Unique(['phoneNumber'])
@Unique(['email'])
@Entity('lecturers')
export class Lecturer extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 70, nullable: true })
  email!: string;

  @Column({ nullable: false, default: false, name: 'email_verified' })
  emailVerified!: boolean;

  @Column({ length: 15, nullable: true, name: 'phone_number' })
  phoneNumber!: string;

  @Column({ length: 100 })
  address!: string;

  @Column({ type: 'text', nullable: true })
  bio!: string;

  // @Column({ type: 'enum', enum: LoginTypeEnum, default: LoginTypeEnum.email, name: 'login_type' })
  // loginType!: LoginTypeEnum;

  @Column({ length: 150 })
  password!: string;

  @Column({ nullable: false, default: false, name: 'is_approved' })
  isApproved!: boolean;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @Column({ length: 100, nullable: true, name: 'short_description' })
  shortDescription?: string;

  @Column({ type: 'text', nullable: true, name: 'example_video' })
  exampleVideo?: string;

  @Column({ name: 'social_link', type: 'text', nullable: true })
  socialLink?: string;

  @Column({ name: 'teaching_topic', type: 'varchar', length: 50, nullable: true })
  teachingTopic?: string;

  @Column({ name: 'teaching_experience', type: 'text', nullable: true })
  teachingExperience?: string;

  @OneToMany(() => Course, (course) => course.lecturer)
  courses!: Promise<Course[]>;

  @Column({ nullable: true, name: 'role_id' })
  roleId!: string;

  @ManyToOne(() => Role, (role) => role.employees)
  @JoinColumn({ name: 'role_id' })
  role!: Promise<Role>;
}
