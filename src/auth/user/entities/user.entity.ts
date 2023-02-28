import { UserRoleEnum } from 'src/enums/role-role.enum';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TimesTampEntity } from '../../../base-entities/times-tamp/times-tamp.entity';

@Entity('users')
// @Unique(['username', 'email'])
export class User extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.ADMIN,
  })
  role: string;

  @Column()
  isActive: boolean;
}
