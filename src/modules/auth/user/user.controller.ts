import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { UserCredentialsDto } from './dto/login-user.dto';

@Controller('auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: RegisterUserDto): Promise<Partial<User>> {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<Partial<User>> {
    return await this.userService.login(userCredentialsDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
