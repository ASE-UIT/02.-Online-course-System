import { LoginTypeEnum } from '@/enums/login-type.enum';
import { BaseModel } from '@/models/base.model';
import { Enrollment } from '@/models/enrollment.model';
import { Role } from '@/models/role.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('students')
export class Student extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 70, nullable: true })
  email!: string;

  @Column({ length: 15, nullable: true, name: 'phone_number' })
  phoneNumber!: string;

  @Column({ type: 'enum', enum: LoginTypeEnum, default: LoginTypeEnum.email, name: 'login_type' })
  loginType!: LoginTypeEnum;

  @Column({ length: 150 })
  password!: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments!: Promise<Enrollment[]>;

  @Column({ nullable: true, name: 'role_id' })
  roleId!: string;

  @ManyToOne(() => Role, (role) => role.employees)
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
