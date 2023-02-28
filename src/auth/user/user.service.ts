import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UserCredentialsDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../interfaces/user.interface';
import { jwtConstants } from '../constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(registerUserDto: RegisterUserDto): Promise<Partial<User>> {
    const user = this.userRepository.create({ ...registerUserDto });
    try {
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, user.salt);
      const userRepo = await this.userRepository.save(user);
      return {
        id: userRepo.id,
        username: userRepo.username,
        role: userRepo.role,
      };
    } catch (error) {
      this.displayCustomErrorMessage(error, 'Cet utilisateur existe déja');
      throw new Error('oups! Une erreur est survenue ');
    }
  }

  async login(userCredetials: UserCredentialsDto): Promise<IUser> {
    const { identifier, password } = userCredetials;

    try {
      const userRepo = await this.userRepository
        .createQueryBuilder('u')
        .where('u.username=:identifier or email=:identifier', { identifier })
        .getOne();
      if (!userRepo) {
        throw new NotFoundException("cet utilisateur n'existe pas");
      } else {
        const hashPassword = await bcrypt.hash(password, userRepo.salt);
        if (hashPassword === userRepo.password) {
          return this.buildResponsePayload(userRepo);
        } else {
          throw new NotFoundException('Mot de passe erroné');
        }
      }
    } catch (error) {
      throw new NotFoundException("cet utilisateur n'existe pas");
    }
  }
  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  displayCustomErrorMessage(error: any, message: string) {
    const {
      driverError: { sqlMessage },
    } = error;
    if (sqlMessage.match('Duplicate')) {
      throw new ConflictException(message);
    }
  }

  generateJWT(user: Partial<User>) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return this.jwtService.sign(
      {
        id: user.id,
        username: user.username,
        exp: exp.getTime() / 1000,
        email: user.email,
      },
      {
        secret: jwtConstants.secret,
      },
    );
  }

  private buildResponsePayload(user: Partial<User>): IUser {
    try {
      const payload: IUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        access_token: this.generateJWT(user),
      };
      return payload;
    } catch (error) {
    } finally {
    }
  }
}
