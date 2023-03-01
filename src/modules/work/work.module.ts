import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Client } from '../client/entities/client.entity';
import { Talent } from '../talent/entities/talent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Talent, Work])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
