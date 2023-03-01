import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Work } from '../entities/work.entity';

@Injectable()
export class WorkRepository extends Repository<Work> {
  constructor(private dataSource: DataSource) {
    super(Work, dataSource.createEntityManager());
  }
}
