import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Work } from '../work/entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Work])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
