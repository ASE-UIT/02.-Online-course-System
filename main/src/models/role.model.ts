import { BaseModel } from '@/models/base.model';
import { Employee } from '@/models/employee.model';
import { Permission } from '@/models/permission.model';
import { injectable } from 'inversify';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';

@injectable()
@Entity()
export class Role extends BaseModel {
  // @PrimaryGeneratedColumn('uuid')
  // id!: string;

  @PrimaryColumn({ length: 40 })
  id!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees!: Employee[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' }
  })
  permissions!: Promise<Permission[]>;
}
