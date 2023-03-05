import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from '~/modules/auth/user/entities/user.entity';
import { CreateWorkDto } from './create-work.dto';

export class UpdateWorkDto extends PartialType(CreateWorkDto) {
  @IsOptional()
  updatedBy: User;
}
