import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Talent } from '../entities/talent.entity';

@Injectable()
export class TalentRepository extends Repository<Talent> {
  constructor(dataSource: DataSource) {
    super(Talent, dataSource.createEntityManager());
  }

  async findByUser(userId: number): Promise<Talent> {
    return await this.createQueryBuilder('t')
      .innerJoinAndSelect('t.user', 'u')
      .andWhere('u.id', { id: userId })
      .getOne();
  }
}
