import { BaseModel } from '@/models/base.model';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('roles_permissions')
export class RolePermission extends BaseModel {
  @PrimaryColumn({ name: 'role_id' })
  roleId!: string;

  @PrimaryColumn({ name: 'permission_id' })
  permissionId!: string;
}
