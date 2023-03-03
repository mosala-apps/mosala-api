import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { displayConflictExceptionMessage } from '~/helpers';
import { IUserResponse } from '~/interfaces/user.response.interface';
import { UserRepository } from '../auth/user/repository/user.repositoy';
import { UserService } from '../auth/user/user.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { Talent } from './entities/talent.entity';

@Injectable()
export class TalentService {
  constructor(
    @InjectRepository(Talent)
    private readonly talentRepository: Repository<Talent>,

    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  async create(
    createTalentDto: CreateTalentDto,
  ): Promise<Talent & IUserResponse & any> {
    try {
      const userCreated = await this.userService.register({
        username: createTalentDto.username,
        email: createTalentDto.email,
        password: createTalentDto.password,
        role: createTalentDto.role,
      });
      if (Object.keys(userCreated).length > 0) {
        const user = await this.userRepository.findOne({
          where: {
            email: createTalentDto.email,
          },
        });
        const talent = await this.talentRepository.create({
          ...createTalentDto,
          user,
        });
        const talentRepo: Talent = await this.talentRepository.save(talent);
        return { ...talentRepo, access_token: userCreated.access_token };
      }
    } catch (error) {
      displayConflictExceptionMessage(error, 'Cet utilisateur existe déja');
    }
  }

  async findAll(): Promise<Talent[]> {
    return await this.talentRepository.find();
  }

  async findOne(id: number): Promise<Talent> {
    return await this.talentRepository.findOne({ where: { id } });
  }

  update(id: number, updateTalentDto: UpdateTalentDto) {
    return `This action updates a #${id} talent`;
  }

  remove(id: number) {
    return `This action removes a #${id} talent`;
  }
}
