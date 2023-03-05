import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TalentsWorkClients } from '~/modules/talents_work_clients/entities/talents-work-clients.entity';
import BaseUserEntity from '~/ORM/base-entities/base-user.entity';

@Entity('clients')
export class Client extends BaseUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => TalentsWorkClients, (work) => work.client)
  works: Array<TalentsWorkClients>;

}
