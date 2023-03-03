import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Talent } from '../entities/talent.entity';

@Injectable()
export class TalentRepository extends Repository<Talent> {
  constructor(dataSource: DataSource) {
    super(Talent, dataSource.createEntityManager());
  }
}
