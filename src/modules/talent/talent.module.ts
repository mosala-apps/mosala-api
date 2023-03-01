import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talent } from './entities/talent.entity';
import { User } from '../auth/user/entities/user.entity';
import { UserService } from '../auth/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Talent, User])],
  controllers: [TalentController],
  providers: [TalentService, UserService],
})
export class TalentModule {}
