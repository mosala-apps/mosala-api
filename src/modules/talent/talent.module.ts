import { Module, forwardRef } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talent } from './entities/talent.entity';
import { TalentRepository } from './repository/talent.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Talent])],
  controllers: [TalentController],
  providers: [TalentService, TalentRepository],
  exports: [TalentService, TalentRepository],
})
export class TalentModule {}
