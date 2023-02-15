import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServerService } from '../services/auth-server.service';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(_authServerService: AuthServerService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      const user = await _authServerService.validateUserByApiKey(apiKey);
      if (user) {
        done(null, user);
      }
      done(new UnauthorizedException(), null);
    });
  }
}
