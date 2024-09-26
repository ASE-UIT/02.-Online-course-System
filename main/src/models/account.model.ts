import { Role } from '@/models/role.model';
import { injectable } from 'inversify';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@injectable()
@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 30 })
  email!: string;

  @Column('varchar', { length: 20 })
  password!: string;

  @Column('varchar', { length: 30 })
  fullname!: string;

  @Column('varchar', { length: 150 })
  address!: string;

  @Column('varchar', { length: 15 })
  phone_number!: string;

  @Column('date')
  birthday!: Date;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  update_at!: Date;
}
