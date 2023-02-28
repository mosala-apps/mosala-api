import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  create(createTopicDto: CreateTopicDto) {
    return this.topicRepository.save(createTopicDto);
  }

  async findAll(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }

  async findOne(id: number): Promise<Partial<Topic>> {
    const topic = await this.topicRepository.findOneOrFail({ where: { id } });
    return topic;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
