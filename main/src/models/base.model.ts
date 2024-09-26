import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
  @CreateDateColumn({ name: 'create_at' })
  createAt!: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt!: Date;

  @Column({ nullable: true, name: 'create_by' })
  createBy!: string;

  @Column({ nullable: true, name: 'update_by' })
  updateBy!: string;

  @Column({ nullable: true, name: 'delete_at' })
  deleteAt!: Date;
}
