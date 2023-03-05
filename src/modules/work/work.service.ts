import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { TalentsWorkClientsService } from '../talents_work_clients/talents_work_clients.service';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './entities/work.entity';
import { WorkRepository } from './repository/work.repository';

@Injectable()
export class WorkService {
  constructor(
    private readonly woprkRepository: WorkRepository,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private talentsWorkClientService: TalentsWorkClientsService,
  ) {}

  async create(createWorkDto): Promise<Work|string> {
    try {
      const { name, firstName, lastName, email, phone } = createWorkDto;

      const client = await this.clientRepository.create({
        name,
        firstName: firstName.toString(),
        lastName,
        phone,
        email,
      });

      const clientRepo = await this.clientRepository.save(client);
      if (Object.keys(clientRepo)) {
        const workEntity = this.woprkRepository.create({
          contractType: createWorkDto.contractType,
          numberOfTalents: createWorkDto.numberOfTalents,
          workDuration: createWorkDto.workDuration,
          description: createWorkDto.description,
          createdBy: createWorkDto.createdBy,
        });
        const workRepo = await this.woprkRepository.save(workEntity);
        const talentsWorkClients = await this.talentsWorkClientService.create(
          clientRepo,
          workRepo,
        );
        if (talentsWorkClients) {
          return workRepo;
        }
        return " Une eurreur s'est produit";
      }
    } catch (error) {}
  }

  async findAll(): Promise<Work[]> {
    try {
      return await this.woprkRepository.find();
    } catch (error) {}
  }

  async findOne(id: number): Promise<Work> {
    try {
      return await this.woprkRepository.findOneOrFail({ where: { id } });
    } catch (error) {}
  }

  update(id: number, updateWorkDto: UpdateWorkDto) {
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
}
