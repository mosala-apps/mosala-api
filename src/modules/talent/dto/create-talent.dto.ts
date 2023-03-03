import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from '~/modules/auth/user/dto/register-user.dto';

export class CreateTalentDto extends RegisterUserDto {
  
  @ApiProperty()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  experience?: string;

  @ApiProperty()
  @IsNotEmpty()
  level?: string;

  @ApiProperty()
  @IsNotEmpty()
  education?: string;

  @ApiProperty()
  @IsNotEmpty()
  githubLink?: string;

  @ApiProperty()
  @IsNotEmpty()
  websiteLink?: string;

  @ApiProperty()
  @IsNotEmpty()
  location?: string;

  @ApiProperty()
  @IsNotEmpty()
  phone?: string;
}
