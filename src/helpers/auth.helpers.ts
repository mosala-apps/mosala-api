import { jwtConstants } from '~/modules/auth/constants';
import { IUser } from 'src/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

export class AuthHelpers {
  private jwtService: JwtService;
  private static instance = null;
  constructor() {
    this.jwtService = new JwtService();
  }
  static getInstance() {
    if (AuthHelpers.instance === null) {
      AuthHelpers.instance = new AuthHelpers();
    }
    return AuthHelpers.instance;
  }
  generateJWT(user: Partial<IUser>) {
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

  buildResponsePayload(user: Partial<IUser>): IUser {
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