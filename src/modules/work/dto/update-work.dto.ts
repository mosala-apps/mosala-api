import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '~/modules/auth/user/entities/user.entity';
import { Talent } from '~/modules/talent/entities/talent.entity';
import { CreateWorkDto } from './create-work.dto';

export class UpdateWorkDto extends PartialType(CreateWorkDto) {
  @IsOptional()
  updatedBy: User;

  @ApiProperty()
  @IsNotEmpty()
  talents: number[];
}
