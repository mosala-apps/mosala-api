import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { IUser } from '~/interfaces/user.interface';
import { jwtConstants } from '../constants';
import { UserRepository } from '../user/repository/user.repositoy';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(paylaod: IUser) {
    try {
      const user = await this.userRepository.getUserActive(paylaod);
      if (Object.keys(user)) {
        delete user.password;
        delete user.salt;
        return user;
      }
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à accéder à cette ressource",
      );
    } catch (error) {}
  }
}
