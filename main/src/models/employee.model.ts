import { LoginTypeEnum } from '@/enums/login-type.enum';
import { BaseModel } from '@/models/base.model';
import { Role } from '@/models/role.model';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('employees')
export class Employee extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true, name: 'role_id' })
  roleId!: string;

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

  @ManyToOne(() => Role, (role) => role.employees)
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
