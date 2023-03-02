import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserCredentialsDto } from './dto/login-user.dto';
import { IUser } from '../../../interfaces/user.interface';
import { displayConflictExceptionMessage } from '~/helpers';
import { AuthHelpers } from '~/helpers/auth.helpers';
import { UserRepository } from './repository/user.repositoy';
import { MailerService } from '~/modules/mailer/mailer.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mailerService: MailerService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<IUser> {
    const user = this.userRepository.create({ ...registerUserDto });

    try {
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, user.salt);
      const userRepo = await this.userRepository.save(user);
      return AuthHelpers.getInstance().buildResponsePayload(userRepo);
    } catch (error) {
      displayConflictExceptionMessage(error, 'Cet utilisateur existe déja');
      throw new Error('oups! Une erreur est survenue ');
    }
  }

  async login(userCredetials: UserCredentialsDto): Promise<IUser> {
    const { identifier, password } = userCredetials;

    try {
      const userRepo = await this.userRepository.getByIdentifier(identifier);
      if (!userRepo) {
        throw new NotFoundException("cet utilisateur n'existe pas");
      } else {
        const hashPassword = await bcrypt.hash(password, userRepo.salt);
        if (hashPassword === userRepo.password) {
          return AuthHelpers.getInstance().buildResponsePayload(userRepo);
        } else {
          throw new NotFoundException('Mot de passe erroné');
        }
      }
    } catch (error) {
      throw new NotFoundException("cet utilisateur n'existe pas");
    }
  }
  async forgotPassword(email): Promise<string> {
    try {
      const user = await this.userRepository.getByIdentifier(email);

      return await this.mailerService.sendForgotPasswordMail(user);
    } catch (error) {
      throw new Error("une erreur s'est produit");
    }
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
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
}
