import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '~/modules/auth/user/entities/user.entity';
import { CreateClientDto } from '~/modules/client/dto/create-client.dto';
import { Technology } from '~/modules/technologies/entities/technology.entity';

export class CreateWorkDto extends CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  contractType: string;

  @ApiProperty()
  @IsNotEmpty()
  numberOfTalents: number;

  @ApiProperty()
  @IsNotEmpty()
  workDuration: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  technologies: Technology[];

  @IsOptional()
  createdBy: User
}
