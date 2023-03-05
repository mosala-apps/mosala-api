import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { TalentsWorkClients } from '../entities/talents-work-clients.entity';


@Injectable()
export class TalentsWorkClientsRepository extends Repository<TalentsWorkClients> {
  constructor(private dataSource: DataSource) {
    super(TalentsWorkClients, dataSource.createEntityManager());
  }
}
