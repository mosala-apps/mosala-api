import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUser } from '~/interfaces/user.interface';
import { QueryBuilder } from 'typeorm/query-builder/QueryBuilder';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserActive(paylaod: IUser): Promise<User> {
    return await this.createQueryBuilder('u')
      .andWhere('u.username=:username')
      .andWhere('u.isActive=:isActive', {
        isActive: true,
        username: paylaod.username,
      })
      .getOne();
  }
  /**
   *
   * @param identifier (email|usename)
   * @returns
   */
  async getByIdentifier(identifier: string): Promise<User> {
    return await this.createQueryBuilder('u')
      .where('u.username=:identifier or email=:identifier', { identifier })
      .getOne();
  }
}
