import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Work } from '~/modules/work/entities/work.entity';
import BaseUserEntity from '~/ORM/base-entities/base-user.entity';

@Entity('clients')
export class Client extends BaseUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Work, (work) => work.client)
  works: Array<Work>;

}
