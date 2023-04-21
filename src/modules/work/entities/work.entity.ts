import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContractTypeEnum } from '~/enums/contract-type.enum';
import { WorkStatusEnum } from '~/enums/work-status.enum';
import { User } from '~/modules/auth/user/entities/user.entity';
import { Client } from '~/modules/client/entities/client.entity';
import { Talent } from '~/modules/talent/entities/talent.entity';
import { Technology } from '~/modules/technologies/entities/technology.entity';

@Entity('works')
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ContractTypeEnum,
    default: ContractTypeEnum.INTERNSHIP,
  })
  contractType: string;

  @Column()
  numberOfTalents: number;

  @Column()
  workDuration: string;

  @Column()
  description: string;

  @ManyToMany(() => Technology, (technology) => technology.works, {
    cascade: true,
  })
  @JoinTable({ name: 'work_technologies' })
  technologies: Technology[];

  @Column({
    type: 'enum',
    enum: WorkStatusEnum,
    default: WorkStatusEnum.IN_PROGRESS,
  })
  status: string;

  @ManyToMany(() => Talent, (talent) => talent.works, { cascade: true })
  @JoinTable({ name: 'work_talents' })
  talents: Talent[];

  @ManyToOne(() => Client, (client) => client.works, {
    cascade: true,
    nullable: true,
  })
  client: Client;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;
}
