import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServerService } from '../services/auth-server.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authServerService: AuthServerService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this._authServerService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(['Invalid email and/or password']);
    }
    return user;
  }
}