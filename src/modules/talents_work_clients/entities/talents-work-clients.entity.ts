import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '~/modules/client/entities/client.entity';
import { Talent } from '~/modules/talent/entities/talent.entity';
import { Work } from '~/modules/work/entities/work.entity';

@Entity('talents_work_clients')
export class TalentsWorkClients {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => Talent, (talent) => talent.works, { eager: true })
  talent: Talent;

  @ManyToOne(() => Work, (work) => work.talentsWorkClients, { eager: true })
  work: Work;
}
