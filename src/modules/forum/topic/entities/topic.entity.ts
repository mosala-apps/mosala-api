import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../../category/entities/category.entity';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
@Entity('topics')
export class Topic extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: () => false })
  solved: boolean;

  @ManyToOne(() => Category, (category) => category.topics)
  category: Category;
}
