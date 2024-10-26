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

  @Column({ type: 'text', nullable: true })
  avatar!: string;

  @Column({ length: 15, nullable: true, name: 'phone_number' })
  phoneNumber!: string;

  @Column({ length: 150 })
  password!: string;

  @Column({ length: 50, nullable: true, name: 'google_id' })
  googleId!: string;

  @Column({ length: 50, nullable: true, name: 'facebook_id' })
  facebookId!: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments!: Promise<Enrollment[]>;

  @Column({ nullable: true, name: 'role_id' })
  roleId!: string;

  @ManyToOne(() => Role, (role) => role.employees)
  @JoinColumn({ name: 'role_id' })
  role!: Promise<Role>;
}
