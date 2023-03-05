import { Module } from '@nestjs/common';
import { TalentsWorkClientsService } from './talents_work_clients.service';
import { TalentsWorkClientsController } from './talents_work_clients.controller';
import { TalentsWorkClientsRepository } from './repository/work.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentsWorkClients } from './entities/talents-work-clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TalentsWorkClients])],
  controllers: [TalentsWorkClientsController],
  providers: [TalentsWorkClientsService, TalentsWorkClientsRepository],
  exports: [TalentsWorkClientsService, TalentsWorkClientsRepository],
})
export class TalentsWorkClientsModule {}
