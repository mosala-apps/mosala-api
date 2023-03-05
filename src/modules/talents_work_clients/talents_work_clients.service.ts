import { Injectable } from '@nestjs/common';
import { Client } from '../client/entities/client.entity';
import { Work } from '../work/entities/work.entity';
import { TalentsWorkClientsRepository } from './repository/work.repository';

@Injectable()
export class TalentsWorkClientsService {
  constructor(
    private talentsWorkClientsRepository: TalentsWorkClientsRepository,
  ) {}
  async create(client: Client, work: Work): Promise<boolean> {
    try {
      const talentsWorkClients = await this.talentsWorkClientsRepository.create(
        {
          client: client,
          work: work,
        },
      );
      const response = await this.talentsWorkClientsRepository.save(
        talentsWorkClients,
      );
      if (response) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error("Oups! une erreur s'est produit");
    }
  }
}
