import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constants';
import { User } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule {}

