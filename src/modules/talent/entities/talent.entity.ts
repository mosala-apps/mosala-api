import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { Work } from '~/modules/work/entities/work.entity';

@Entity('talents')
export class Talent extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  name?: string;

  @Column()
  experience?: string;

  @Column()
  level?: string;

  @Column()
  education?: string;

  @Column()
  githubLink?: string;

  @Column()
  websiteLink?: string;

  @Column()
  location?: string;

  @Column()
  phone?: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Work, (work) => work.talent)
  works: Array<Work>;
  
  @OneToMany(() => Project, (project) => project.talent)
  projects: Array<Project>;
}
