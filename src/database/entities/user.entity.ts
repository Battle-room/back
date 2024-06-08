import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'bool', default: false })
  emailApproved: boolean;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true})
  avatar?: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens?: Token[];
}
