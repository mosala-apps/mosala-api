import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { Talent } from '../talent/entities/talent.entity';
import { TalentRepository } from '../talent/repository/talent.repository';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './entities/work.entity';
import { WorkRepository } from './repository/work.repository';

@Injectable()
export class WorkService {
  constructor(
    private readonly woprkRepository: WorkRepository,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private talentRepository: TalentRepository,
  ) {}

  async create(createWorkDto): Promise<Work | string> {
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
          client: clientRepo,
        });
        const workRepo = await this.woprkRepository.save(workEntity);
        if (workRepo !== undefined && workRepo !== null) {
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
  async matching(id: number, updateWorkDto: UpdateWorkDto) {
    // try {
    //   // const work = await this.findOne(id);
    //   // const talents: Talent[] = [];
    //   // console.log('====================================');
    //   // console.log('work', work);
    //   // console.log('====================================');
    //   // if (work) {
    //   //   updateWorkDto.talents.forEach(async (item) => {
    //   //     const talent = await this.talentRepository.findByIds({
    //   //       where: { id: item },
    //   //     });
    //   //     work.talents = [talent];
    //   //     await talents.push(talent);
    //   //     console.log('====================================');
    //   //     console.log(talent);
    //   //     console.log('====================================');
    //   //   });
    //   //   console.log('====================================');
    //   //   console.log('talents array:', talents);
    //   //   console.log('====================================');
    //   //   return await this.woprkRepository.save(work);
    //   }
    //   return `Echec du matching`;
    // } catch (error) {
    //   throw new Error("Une erreur s'est produit lors du matching");
    // }
    return 'je';
  }
  async update(id: number, updateWorkDto: UpdateWorkDto) {
    const work = await this.findOne(id);
    // if (work) {
    //   const workUpdated = await this.talentsWorkClientService.
    // }
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
}
