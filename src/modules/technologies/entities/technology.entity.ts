import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Work } from '~/modules/work/entities/work.entity';

@Entity('technologies')
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iconUrl: string;

  @ManyToMany(() => Work, (work) => work.technologies)
  works: Work[];
}
