import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './entities/work.entity';
import { WorkRepository } from './repository/work.repository';

@Injectable()
export class WorkService {
  constructor(
    private readonly woprkRepository: WorkRepository,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  
  async create(createWorkDto): Promise<Work> {
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
          client: clientRepo,
          contractType: createWorkDto.contractType,
          numberOfTalents: createWorkDto.numberOfTalents,
          workDuration: createWorkDto.workDuration,
          description: createWorkDto.description,
          createdBy: createWorkDto.createdBy
        });

        const workRepo = await this.woprkRepository.save(workEntity);
        return workRepo;
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
