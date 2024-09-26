import { LoginTypeEnum } from '@/enums/login-type.enum';
import { BaseModel } from '@/models/base.model';
import { Course } from '@/models/course.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('lecturers')
export class Lecturer extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 70, nullable: true })
  email!: string;

  @Column({ length: 15, nullable: true, name: 'phone_number' })
  phoneNumber!: string;

  @Column({ length: 100 })
  address!: string;

  @Column({ type: 'text', nullable: true })
  bio!: string;

  @Column({ type: 'enum', enum: LoginTypeEnum, default: LoginTypeEnum.email, name: 'login_type' })
  loginType!: LoginTypeEnum;

  @Column({ length: 150 })
  password!: string;

  @OneToMany(() => Course, (course) => course.lecturer)
  courses!: Promise<Course[]>;
}
