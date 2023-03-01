import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Work } from '~/modules/work/entities/work.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @OneToMany(() => Work, (work) => work.client)
  works: Work[];
}
