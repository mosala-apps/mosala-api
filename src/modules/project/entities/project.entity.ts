import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Talent } from '../../talent/entities/talent.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Talent, (talent) => talent.projects)
  talent: Talent;
}
