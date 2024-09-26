import { BaseModel } from '@/models/base.model';
import { Role } from '@/models/role.model';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';

@Entity('permissions')
export class Permission extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 40 })
  code!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
