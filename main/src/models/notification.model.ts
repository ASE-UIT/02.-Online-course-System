import { RoleEnum } from '@/enums/role.enum';
import { BaseModel } from '@/models/base.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('notification')
export class Notification extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  title?: string;

  @Column({ type: 'boolean', default: false })
  isRead!: boolean;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.STUDENT })
  role!: RoleEnum;

  @Column({ type: 'varchar', length: 100, nullable: false })
  notiType!: string;
}
