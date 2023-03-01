import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContractTypeEnum } from '~/enums/contract-type.enum';
import { WorkStatusEnum } from '~/enums/work-status.enum';
import { Client } from '~/modules/client/entities/client.entity';
import { Talent } from '~/modules/talent/entities/talent.entity';

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

  @Column({ type: 'json' })
  technologies: string;

  @Column({
    type: 'enum',
    enum: WorkStatusEnum,
    default: WorkStatusEnum.IN_PROGRESS,
  })
  status: string;

  @ManyToOne(() => Client, (client) => client.works)
  client: Client;

  @ManyToOne(() => Talent, (talent) => talent.works)
  talent: Talent;
}
